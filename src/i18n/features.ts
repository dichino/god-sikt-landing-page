const en = {
  sectionLabel: 'THE CORE',
  title: ['One map.', 'Three ways to see more.'],
  introduction: ['Focused tools, connected by place.', 'Built around the questions that matter.'],
  map: {
    alt: 'Original Android map screen with GPS position and map controls.',
    caption: '01 / THE MAP IS THE STARTING POINT',
    label: 'ORIENT YOURSELF',
    title: ['Maps at', 'the center.'],
    description: 'Pan, zoom, and find your position. The Android app combines Mapbox’s interactive map with GPS positioning and a nautical depth overlay. Select a point to give the next interaction a place.',
    annotation: 'A selected position, a shared context.',
  },
  weather: {
    label: 'UNDERSTAND THE CONDITIONS',
    title: ['Weather where', 'it matters.'],
    description: 'Temperature, wind, precipitation, and fog — brought into one card for your selected position, with contextual alerts from MET Norway.',
    alt: 'The Android weather card showing temperature, wind, fog, precipitation, and a weather warning.',
    annotation: ['From coordinates', 'to conditions.'],
  },
  signs: {
    label: 'BUILD YOUR UNDERSTANDING',
    title: ['Maritime information,', 'made accessible.'],
    description: 'A visual reference for the signs you meet on the water. Five categories bring original illustrations and clear descriptions into a local library.',
    portAlt: 'Port side navigation mark', portLabel: 'PORT',
    passageAlt: 'Best point of passage sign', passageLabel: 'PASSAGE',
    starboardAlt: 'Starboard side navigation mark', starboardLabel: 'STARBOARD',
    demoLink: 'Explore the app demo',
  },
  howItWorks: {
    sectionLabel: 'HOW IT WORKS',
    title: ['A point on the map.', 'A little more perspective.'],
    introduction: ['Follow a single interaction', 'from a tap to the weather card.'],
    flowLabel: 'Explore the interaction flow',
    restartLabel: 'Restart interaction walkthrough', nextLabel: 'Next interaction step',
    steps: [
      { title: 'Open the map', detail: 'The map provides your starting point. With location permission, the Android app can show your current position.', label: 'MAP READY' },
      { title: 'Select a location', detail: 'Tap a point on the map. A marker records the latitude and longitude that give the next request its context.', label: '59.895° N · 10.737° E' },
      { title: 'Request the weather', detail: 'Use the weather button. The app requests forecast and alert information for the chosen coordinates.', label: 'REQUESTING CONDITIONS' },
      { title: 'Receive the context', detail: 'The repository turns nested API responses into the values and alert information the interface needs.', label: 'FORECAST + ALERT DATA' },
      { title: 'Explore the conditions', detail: 'The weather card presents the results. Select another point to explore conditions somewhere else.', label: 'WEATHER CARD UPDATED' },
    ],
  },
};

const nb: typeof en = {
  sectionLabel: 'KJERNEFUNKSJONENE',
  title: ['Ett kart.', 'Tre måter å få oversikt på.'],
  introduction: ['Nyttige verktøy, knyttet til samme sted.', 'Utviklet for spørsmålene som betyr noe.'],
  map: {
    alt: 'Original kartskjerm fra Android-appen med GPS-posisjon og kartkontroller.',
    caption: '01 / KARTET ER UTGANGSPUNKTET',
    label: 'FINN VEIEN', title: ['Kartet', 'i sentrum.'],
    description: 'Flytt kartet, zoom inn og finn posisjonen din. Android-appen kombinerer Mapbox sitt interaktive kart med GPS-posisjonering og et kartlag med sjødybder. Velg et punkt som utgangspunkt for neste steg.',
    annotation: 'Ett valgt sted. Informasjon som hører sammen.',
  },
  weather: {
    label: 'FORSTÅ FORHOLDENE', title: ['Været der', 'du skal.'],
    description: 'Temperatur, vind, nedbør og tåke samlet i ett værkort for stedet du har valgt, med aktuelle farevarsler fra Meteorologisk institutt.',
    alt: 'Værkortet i Android-appen viser temperatur, vind, tåke, nedbør og et farevarsel.',
    annotation: ['Fra koordinater', 'til værforhold.'],
  },
  signs: {
    label: 'BLI KJENT MED SKILTENE', title: ['Sjøvett starter', 'med forståelse.'],
    description: 'Et visuelt oppslagsverk for skiltene du møter på sjøen. Fem kategorier samler originale illustrasjoner og tydelige beskrivelser i et lokalt skiltbibliotek.',
    portAlt: 'Sidemarkering babord', portLabel: 'BABORD',
    passageAlt: 'Skilt for beste punkt for passering', passageLabel: 'PASSERING',
    starboardAlt: 'Sidemarkering styrbord', starboardLabel: 'STYRBORD',
    demoLink: 'Utforsk app-demoen',
  },
  howItWorks: {
    sectionLabel: 'SLIK FUNGERER DET',
    title: ['Et punkt på kartet.', 'Litt bedre oversikt.'],
    introduction: ['Følg ett valg gjennom appen,', 'fra trykk på kartet til ferdig værkort.'],
    flowLabel: 'Utforsk stegene fra kart til værkort',
    restartLabel: 'Start gjennomgangen på nytt', nextLabel: 'Vis neste steg',
    steps: [
      { title: 'Åpne kartet', detail: 'Kartet er utgangspunktet. Med tillatelse til å bruke posisjon kan Android-appen vise hvor du er.', label: 'KARTET ER KLART' },
      { title: 'Velg et sted', detail: 'Trykk på et punkt i kartet. En markør lagrer breddegrad og lengdegrad for neste forespørsel.', label: '59,895° N · 10,737° Ø' },
      { title: 'Hent værmeldingen', detail: 'Trykk på værknappen. Appen henter værmelding og farevarsler for koordinatene du har valgt.', label: 'HENTER VÆRDATA' },
      { title: 'Behandle dataene', detail: 'Datalaget omformer svarene fra API-ene til værverdier og farevarsler som kan vises i appen.', label: 'VÆRMELDING + FAREVARSLER' },
      { title: 'Se værforholdene', detail: 'Værkortet viser resultatene. Velg et nytt punkt for å undersøke forholdene et annet sted.', label: 'VÆRKORTET ER OPPDATERT' },
    ],
  },
};

export const featuresCopy = { en, nb };
