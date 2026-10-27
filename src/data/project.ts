export const links = {
  github: 'https://github.com/dichino/GodSikt-app',
  figma: 'https://www.figma.com/proto/WTGT0fELq5jkFXX33YFUXI/IN2000-High-Fidelity?node-id=1-404',
};

export const navigationByLocale = {
  nb: [
    { label: 'Opplevelsen', href: '#experience' },
    { label: 'Teknologien', href: '#engineering' },
    { label: 'Prosessen', href: '#process' },
  ],
  en: [
    { label: 'The experience', href: '#experience' },
    { label: 'The engineering', href: '#engineering' },
    { label: 'The process', href: '#process' },
  ],
};

export const technologiesByLocale = {
  nb: [
    { name: 'Kotlin', role: 'Programmeringsspråket bak Android-appen.', tag: 'SPRÅK' },
    { name: 'Jetpack Compose', role: 'Deklarative skjermbilder som oppdateres når appens tilstand endres.', tag: 'GRENSESNITT' },
    { name: 'Mapbox', role: 'Interaktive kart, valg av koordinater og brukerens posisjon.', tag: 'KART' },
    { name: 'Ktor + Coroutines', role: 'Asynkrone HTTP-forespørsler og deserialisering av JSON.', tag: 'NETTVERK' },
    { name: 'Room', role: 'En medfølgende database for oppslag i sjøfartsskilt.', tag: 'LOKALE DATA' },
    { name: 'MET Norway', role: 'Værdata fra Locationforecast og farevarsler fra MetAlerts.', tag: 'VÆR' },
    { name: 'AndroidX Navigation', role: 'Navigasjon mellom kart, skilt og informasjonssider.', tag: 'NAVIGASJON' },
    { name: 'Coil', role: 'Innlasting av bilder i Compose-grensesnittet.', tag: 'BILDER' },
  ],
  en: [
    { name: 'Kotlin', role: 'The language behind the Android application.', tag: 'LANGUAGE' },
    { name: 'Jetpack Compose', role: 'Declarative screens that respond to application state.', tag: 'INTERFACE' },
    { name: 'Mapbox', role: 'Interactive maps, selected coordinates, and user location.', tag: 'MAPPING' },
    { name: 'Ktor + Coroutines', role: 'Asynchronous HTTP requests and JSON deserialization.', tag: 'NETWORKING' },
    { name: 'Room', role: 'A bundled, queryable database of maritime signs.', tag: 'LOCAL DATA' },
    { name: 'MET Norway', role: 'Locationforecast weather data and MetAlerts warnings.', tag: 'WEATHER' },
    { name: 'AndroidX Navigation', role: 'Routes between map, sign, and information screens.', tag: 'NAVIGATION' },
    { name: 'Coil', role: 'Image loading within the Compose interface.', tag: 'IMAGES' },
  ],
};

export const architectureByLocale = {
  nb: [
    { id: 'ui', name: 'Compose-grensesnitt', layer: '01 / PRESENTASJON', file: 'MapScreen · WeatherCard', description: 'Kartet er utgangspunktet. Et trykk velger koordinater, og værknappen åpner et kort. Compose observerer tilstanden og viser den valgte posisjonen og værforholdene der.', detail: 'Brukerhandlinger oppdaterer tilstanden. Oppdaterte værdata vises deretter i grensesnittet.' },
    { id: 'state', name: 'ViewModels', layer: '02 / TILSTAND OG KOORDINERING', file: 'MapViewModel · AppViewModel', description: 'MapViewModel holder oversikt over valgte koordinater og brukerens siste posisjon. AppViewModel starter korutiner og gjør værdata og farevarsler tilgjengelige gjennom StateFlow.', detail: 'Dette er klasser i én Android-appmodul. Lagene beskriver ansvarsområder, ikke separate Gradle-moduler.' },
    { id: 'repository', name: 'WeatherRepository', layer: '03 / DATATRANSFORMASJON', file: 'LocationInfo · MetAlert', description: 'Repository-klassen henter værmeldinger og farevarsler, og omformer de nøstede svarene til mindre datamodeller som værkortet bruker.', detail: 'Den henter ut temperatur, vindstyrke og vindretning, nedbør, tåkeandel og en varselbeskrivelse. Manglende felt får standardverdier.' },
    { id: 'api', name: 'Værtjenester', layer: '04 / EKSTERNE DATA', file: 'Ktor · Locationforecast · MetAlerts', description: 'To Ktor-datakilder bygger forespørsler fra breddegrad og lengdegrad og deserialiserer svarene fra Meteorologisk institutt. Det opprinnelige prosjektet brukte universitetets mellomtjener for å nå tjenestene.', detail: 'Demoen på denne nettsiden bruker lokale eksempeldata. Den verken kontakter mellomtjeneren eller inneholder tilgangsopplysningene.' },
    { id: 'room', name: 'Lokalt skiltbibliotek', layer: 'PARALLELT / LOKALE DATA', file: 'SignViewModel · SignDao · Room', description: 'En egen dataflyt forsyner skiltbiblioteket. En medfølgende Room-database lagrer navn, beskrivelser og kategorier. Illustrasjonene ligger som bilderessurser i appen.', detail: 'Room brukes til skiltsamlingen, ikke til mellomlagring av værdata. Grensesnittet henter skiltene i valgt kategori og åpner deretter det valgte skiltet.' },
  ],
  en: [
    { id: 'ui', name: 'Compose UI', layer: '01 / PRESENTATION', file: 'MapScreen · WeatherCard', description: 'The map is the starting point. A tap selects coordinates; a weather action opens a card. Compose reads observable state to display the selected position and its conditions.', detail: 'User actions move into the state holders. Updated weather state moves back to the interface.' },
    { id: 'state', name: 'ViewModels', layer: '02 / STATE & COORDINATION', file: 'MapViewModel · AppViewModel', description: 'MapViewModel tracks selected coordinates and the latest user location. AppViewModel launches coroutine work and exposes weather and alert state through StateFlow.', detail: 'These are classes within one Android app module. The layers describe responsibilities, not separate Gradle modules.' },
    { id: 'repository', name: 'WeatherRepository', layer: '03 / DATA MAPPING', file: 'LocationInfo · MetAlert', description: 'The repository requests forecasts and alerts, then maps their nested responses into the smaller models used by the weather card.', detail: 'It extracts temperature, wind speed and direction, precipitation, fog fraction, and an alert description. Missing fields receive fallback values.' },
    { id: 'api', name: 'Weather services', layer: '04 / REMOTE DATA', file: 'Ktor · Locationforecast · MetAlerts', description: 'Two Ktor data sources construct requests from latitude and longitude and deserialize the MET Norway responses. The original project accessed the services through the university gateway.', detail: 'The website demo uses local example data and never calls this gateway or includes its credentials.' },
    { id: 'room', name: 'Local sign library', layer: 'PARALLEL / LOCAL DATA', file: 'SignViewModel · SignDao · Room', description: 'A separate flow supplies the maritime reference library. A bundled Room database stores sign names, descriptions, and categories. Drawable resources provide their illustrations.', detail: 'Room supports the sign collection; it is not a weather cache. The interface reads the chosen category, then opens the selected sign.' },
  ],
};

export type DemoMode = 'map' | 'weather' | 'signs' | 'about';

export const demoModesByLocale = {
  nb: [
    { id: 'map', label: 'Finn fram på kartet.', title: 'Utforsk kartet', description: 'Velg et punkt i illustrasjonen av Oslofjorden. Den valgte posisjonen bestemmer hvilket sted værkortet viser.' },
    { id: 'weather', label: 'Få oversikt over været.', title: 'Sjekk værforholdene', description: 'Åpne en samlet oversikt over temperatur, vind, nedbør og tåke. Alle verdiene i denne gjenskapingen er eksempeldata.' },
    { id: 'signs', label: 'Bli kjent med skiltene.', title: 'Utforsk sjøfartsskiltene', description: 'Bla gjennom de fem opprinnelige kategoriene, med originale illustrasjoner og norske beskrivelser fra appen.' },
    { id: 'about', label: 'Se bakgrunnen.', title: 'Om appen', description: 'Les om prosjektet og datakildene, med den opprinnelige appens navigasjon mellom Kart, Skilt og Om.' },
  ],
  en: [
    { id: 'map', label: 'Find your bearings.', title: 'Explore the map', description: 'Choose a point in the illustrative Oslofjord map. The selected position becomes the context for the weather card.' },
    { id: 'weather', label: 'Read the conditions.', title: 'Check the weather', description: 'Open a compact view of temperature, wind, precipitation, and fog. Every value in this recreation is sample data.' },
    { id: 'signs', label: 'Know the signs.', title: 'Browse maritime signs', description: 'Explore the original five categories, with authentic illustrations and Norwegian descriptions from the app.' },
    { id: 'about', label: 'Get the context.', title: 'About the application', description: 'See the project background and data sources, following the original app’s Kart, Skilt, and Om navigation.' },
  ],
} as const;
