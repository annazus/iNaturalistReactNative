import { fireEvent, render, screen } from "@testing-library/react-native";
import InlineUser from "components/SharedComponents/InlineUser";
import React from "react";
import useIsConnected from "sharedHooks/useIsConnected";

import factory from "../../../factory";

jest.mock( "sharedHooks/useIsConnected" );
useIsConnected.mockReturnValue( true );

const mockNavigate = jest.fn( );
jest.mock( "@react-navigation/native", ( ) => {
  const actualNav = jest.requireActual( "@react-navigation/native" );
  return {
    ...actualNav,
    useNavigation: ( ) => ( {
      navigate: mockNavigate
    } )
  };
} );

const mockUser = factory( "RemoteUser" );
const mockUserWithoutImage = factory( "RemoteUser", { icon_url: null } );

describe( "InlineUser", ( ) => {
  it( "displays user handle and image correctly", async ( ) => {
    render( <InlineUser user={mockUser} /> );
    // Check for user name text
    expect( screen.getByText( `@${mockUser.login}` ) ).toBeTruthy( );
    // This image appears after useIsConnected returns true
    // so we have to use await and findByTestId
    const profilePicture = await screen.findByTestId( "UserIcon.photo" );
    expect( profilePicture ).toBeTruthy( );
    expect( profilePicture.props.source ).toEqual( { uri: mockUser.icon_url } );
    expect( screen.queryByTestId( "InlineUser.FallbackPicture" ) ).not.toBeTruthy( );
    expect( screen.queryByTestId( "InlineUser.NoInternetPicture" ) ).not.toBeTruthy( );
  } );

  it( "displays user handle and and fallback image correctly", async ( ) => {
    render( <InlineUser user={mockUserWithoutImage} /> );

    expect( screen.getByText( `@${mockUserWithoutImage.login}` ) ).toBeTruthy();
    // This icon appears after useIsConnected returns true
    // so we have to use await and findByTestId
    expect( await screen.findByTestId( "InlineUser.FallbackPicture" ) ).toBeTruthy();
    expect( screen.queryByTestId( "UserIcon.photo" ) ).not.toBeTruthy();
    expect( screen.queryByTestId( "InlineUser.NoInternetPicture" ) ).not.toBeTruthy();
  } );

  it( "fires onPress handler", ( ) => {
    render( <InlineUser user={mockUser} /> );

    const inlineUserComponent = screen.getByRole( "link" );
    fireEvent.press( inlineUserComponent );

    expect( mockNavigate )
      .toHaveBeenCalledWith( "UserProfile", { userId: mockUser.id } );
  } );

  describe( "when offline", () => {
    beforeEach( () => {
      useIsConnected.mockReturnValue( false );
    } );

    afterEach( () => {
      useIsConnected.mockReturnValue( true );
    } );

    it( "displays no internet fallback image correctly", async () => {
      render( <InlineUser user={mockUser} /> );

      expect( screen.getByText( `@${mockUser.login}` ) ).toBeTruthy();
      // This icon appears after useIsConnected returns false
      // so we have to use await and findByTestId
      expect( await screen.findByTestId( "InlineUser.NoInternetPicture" ) ).toBeTruthy();
      expect( screen.queryByTestId( "UserIcon.photo" ) ).not.toBeTruthy();
      expect( screen.queryByTestId( "InlineUser.FallbackPicture" ) ).not.toBeTruthy( );
    } );
  } );
} );
