import { render, screen } from "@testing-library/react-native";
import DisplayTaxonName from "components/DisplayTaxonName";
import React from "react";

import factory from "../../factory";

const speciesTaxon = factory( "LocalTaxon", {
  name: "Chelonia mydas",
  preferred_common_name: "Green Sea Turtle",
  rank: "species",
  rank_level: 10
} );

const noCommonNameTaxon = factory( "LocalTaxon", {
  preferred_common_name: null,
  rank: "species",
  rank_level: 10
} );

const highRankTaxon = factory( "LocalTaxon", {
  preferred_common_name: null,
  rank_level: 27
} );

const subspeciesTaxon = factory( "LocalTaxon", {
  name: "Lupinus albifrons collinus",
  preferred_common_name: "Silver Lupine",
  rank: "variety",
  rank_level: 9
} );

const uncapitalizedTaxon = factory( "LocalTaxon", {
  name: "Acanthaster planci",
  preferred_common_name: "cRoWn-Of-ThOrNs blue sEa-StarS",
  rank: "species",
  rank_level: 10
} );

describe( "when common name is first", () => {
  const user = { prefers_scientific_name_first: false };

  test( "renders correct taxon for species", () => {
    render(
      <DisplayTaxonName item={{ taxon: speciesTaxon, user }} />
    );

    expect(
      screen.getByText( `${speciesTaxon.preferred_common_name} (${speciesTaxon.name})` )
    ).toBeTruthy();
  } );

  test( "renders correct taxon w/o common name", () => {
    render(
      <DisplayTaxonName item={{ taxon: noCommonNameTaxon, user }} />
    );

    expect( screen.getByText( noCommonNameTaxon.name ) ).toBeTruthy();
  } );

  test( "renders correct taxon w/o common name and no species", () => {
    render(
      <DisplayTaxonName item={{ taxon: highRankTaxon, user }} />
    );

    expect(
      screen.getByText( `${highRankTaxon.rank} ${highRankTaxon.name}` )
    ).toBeTruthy();
  } );

  test( "renders correct taxon for a subspecies", () => {
    render(
      <DisplayTaxonName item={{ taxon: highRankTaxon, user }} />
    );

    expect(
      screen.getByText( `${highRankTaxon.rank} ${highRankTaxon.name}` )
    ).toBeTruthy();
  } );

  test( "renders correct taxon for species", () => {
    render(
      <DisplayTaxonName item={{ taxon: subspeciesTaxon, user }} />
    );

    expect(
      screen.getByText( "Silver Lupine (Lupinus albifrons var. collinus)" )
    ).toBeTruthy();
  } );

  test( "renders correct taxon for improperly capitalized common name", () => {
    render(
      <DisplayTaxonName item={{ taxon: uncapitalizedTaxon, user }} />
    );

    expect(
      screen.getByText( "Crown-of-thorns Blue Sea-Stars (Acanthaster planci)" )
    ).toBeTruthy();
  } );
} );

describe( "when scientific name is first", () => {
  const user = { prefers_scientific_name_first: true };

  test( "renders correct taxon for species", () => {
    render(
      <DisplayTaxonName item={{ taxon: speciesTaxon, user }} />
    );

    expect(
      screen.getByText( `${speciesTaxon.name} (${speciesTaxon.preferred_common_name})` )
    ).toBeTruthy();
  } );

  test( "renders correct taxon w/o common name", () => {
    render(
      <DisplayTaxonName item={{ taxon: noCommonNameTaxon, user }} />
    );

    expect( screen.getByText( noCommonNameTaxon.name ) ).toBeTruthy();
  } );

  test( "renders correct taxon w/o common name and no species", () => {
    render(
      <DisplayTaxonName item={{ taxon: highRankTaxon, user }} />
    );

    expect(
      screen.getByText( `${highRankTaxon.rank} ${highRankTaxon.name}` )
    ).toBeTruthy();
  } );

  test( "renders correct taxon for species", () => {
    render(
      <DisplayTaxonName item={{ taxon: subspeciesTaxon, user }} />
    );

    expect(
      screen.getByText( "Lupinus albifrons var. collinus (Silver Lupine)" )
    ).toBeTruthy();
  } );
} );
