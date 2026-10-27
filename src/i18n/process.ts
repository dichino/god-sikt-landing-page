const en = {
  evolution: {
    sectionLabel: 'THE EVOLUTION', title: ['From prototype', 'to product.'],
    introduction: ['Keep the intent. Refine the scope.', 'Build what makes the experience work.'],
    figmaLink: 'Explore Figma prototype', comparisonLabel: 'Choose screen comparison',
    mapButton: 'Map experience', weatherButton: 'Weather experience',
    prototype: {
      label: '01 / DESIGNED IN FIGMA', phase: 'THE EXPLORATION',
      mapAlt: 'High-fidelity Figma map screen, showing the broader design concept.',
      weatherAlt: 'High-fidelity Figma weather screen, showing the broader design concept.',
      title: 'High-fidelity prototype',
      description: 'Maps, signs, and weather — plus concepts for accounts, profiles, settings, and a calendar.',
      tag: 'EXPLORATORY SCOPE',
    },
    application: {
      label: '02 / BUILT WITH KOTLIN', phase: 'THE IMPLEMENTATION',
      mapAlt: 'Delivered Android map screen with the Kart, Skilt, and Om navigation.',
      weatherAlt: 'Delivered Android weather screen with the Kart, Skilt, and Om navigation.',
      title: 'Delivered Android application',
      description: 'A focused map experience, location-based forecasts and alerts, maritime signs, and About information.',
      tag: 'IMPLEMENTED CORE',
    },
    note: 'Original exported Figma screens are shown alongside actual Android screenshots. Account and calendar concepts were not delivered. The SOS interface was a proof of concept with no rescue-service integration.',
  },
  development: {
    sectionLabel: 'THE PROCESS', title: ['Built. Tested.', 'Reconsidered.'],
    introduction: ['Collaborative development at the University of Oslo.', 'From the first question to the final implementation.'],
    timeline: [
      { number: '01', title: 'Understand', description: 'Interviews, a survey, and personas helped identify what recreational boaters wanted to know.' },
      { number: '02', title: 'Explore', description: 'Wireframes and three high-fidelity iterations made the concept tangible before implementation.' },
      { number: '03', title: 'Build', description: 'Short development cycles brought Compose, Mapbox, remote weather services, and local sign data together.' },
      { number: '04', title: 'Refine', description: 'Think-aloud prototype testing and Android accessibility checks informed navigation, labels, and contrast.' },
    ],
    qualityLabel: 'QUALITY, WITH CONTEXT', qualityTitle: 'Evidence over inflated claims.',
    testingDescription: 'The Android source includes JUnit and MockK tests for selected logic, alongside API smoke tests. The development process included Postman validation, TalkBack checks, and Accessibility Scanner feedback.',
    testingNote: 'The test suite is limited; no coverage percentage or accessibility certification is claimed. Usability evaluation focused on the Figma prototype.',
  },
  links: {
    eyebrow: 'THE NEXT CHAPTER IS YOURS TO EXPLORE', title: 'Go a little deeper',
    description: 'The code behind the experience. The design that started it.',
    sourceLabel: 'THE IMPLEMENTATION', sourceTitle: 'Explore the source',
    sourceDescription: 'Kotlin, Compose, and everything underneath.',
    prototypeLabel: 'THE ORIGINAL VISION', prototypeTitle: 'Open the prototype',
    prototypeDescription: 'Explore the high-fidelity Figma design.',
    note: 'GitHub source is public. Figma access is subject to the file’s sharing settings; exported previews are included above.',
  },
  footer: {
    description: 'A collaborative Android project.', university: 'University of Oslo · IN2000 · 2024',
    credit: 'Website created by Dichino Nguyen', backToTop: 'Back to the surface',
  },
};

const nb: typeof en = {
  evolution: {
    sectionLabel: 'UTVIKLINGEN', title: ['Fra prototype', 'til ferdig app.'],
    introduction: ['Bevar ideen. Spiss omfanget.', 'Bygg det som gjør appen nyttig.'],
    figmaLink: 'Utforsk prototypen i Figma', comparisonLabel: 'Velg skjermer å sammenligne',
    mapButton: 'Kartvisning', weatherButton: 'Værvisning',
    prototype: {
      label: '01 / DESIGNET I FIGMA', phase: 'UTFORSKINGEN',
      mapAlt: 'Detaljert kartskjerm fra Figma-prototypen, som viser det opprinnelige designkonseptet.',
      weatherAlt: 'Detaljert værskjerm fra Figma-prototypen, som viser det opprinnelige designkonseptet.',
      title: 'Detaljert designprototype',
      description: 'Kart, skilt og vær, samt konsepter for brukerkontoer, profiler, innstillinger og en kalender.',
      tag: 'ET BREDERE KONSEPT',
    },
    application: {
      label: '02 / UTVIKLET MED KOTLIN', phase: 'IMPLEMENTASJONEN',
      mapAlt: 'Kartskjermen i den leverte Android-appen med navigasjon til Kart, Skilt og Om.',
      weatherAlt: 'Værskjermen i den leverte Android-appen med navigasjon til Kart, Skilt og Om.',
      title: 'Den leverte Android-appen',
      description: 'En tydelig kartvisning, stedstilpassede værmeldinger og farevarsler, sjøskilt og informasjon om appen.',
      tag: 'KJERNEFUNKSJONENE PÅ PLASS',
    },
    note: 'Originale skjermeksporter fra Figma vises ved siden av faktiske skjermbilder fra Android-appen. Brukerkontoer og kalender ble ikke implementert. SOS-skjermen var en konseptdemonstrasjon uten tilkobling til redningstjenesten.',
  },
  development: {
    sectionLabel: 'PROSESSEN', title: ['Utviklet. Testet.', 'Vurdert på nytt.'],
    introduction: ['Et samarbeidsprosjekt ved Universitetet i Oslo.', 'Fra de første spørsmålene til den ferdige appen.'],
    timeline: [
      { number: '01', title: 'Forstå', description: 'Intervjuer, en spørreundersøkelse og personas bidro til å kartlegge hva fritidsbåtbrukere ønsket å vite.' },
      { number: '02', title: 'Utforske', description: 'Skisser og tre iterasjoner med detaljerte prototyper gjorde ideen konkret før implementasjonen.' },
      { number: '03', title: 'Utvikle', description: 'Korte utviklingssykluser samlet Compose, Mapbox, eksterne værtjenester og lokale skiltdata i én app.' },
      { number: '04', title: 'Forbedre', description: 'Tenke-høyt-testing av prototypen og tilgjengelighetssjekker i Android ga grunnlag for bedre navigasjon, tekster og kontrast.' },
    ],
    qualityLabel: 'KVALITET OG TESTING', qualityTitle: 'Dette ble faktisk testet.',
    testingDescription: 'Android-koden inneholder JUnit- og MockK-tester for utvalgt logikk, samt enkle tester av API-tilkoblinger. Under utviklingen brukte teamet også Postman, TalkBack og Accessibility Scanner.',
    testingNote: 'Testomfanget er begrenset. Prosjektet oppgir verken en prosentandel for testdekning eller noen tilgjengelighetssertifisering. Brukervennlighet ble hovedsakelig evaluert i Figma-prototypen.',
  },
  links: {
    eyebrow: 'UTFORSK PROSJEKTET VIDERE', title: 'Se hva som ligger bak',
    description: 'Koden som driver appen. Designet som startet det hele.',
    sourceLabel: 'IMPLEMENTASJONEN', sourceTitle: 'Utforsk kildekoden',
    sourceDescription: 'Kotlin, Compose og teknologien bak appen.',
    prototypeLabel: 'DEN OPPRINNELIGE IDEEN', prototypeTitle: 'Åpne prototypen',
    prototypeDescription: 'Utforsk den detaljerte designprototypen i Figma.',
    note: 'Kildekoden er offentlig tilgjengelig på GitHub. Tilgang til Figma avhenger av filens delingsinnstillinger. Eksporterte skjermbilder er vist ovenfor.',
  },
  footer: {
    description: 'En Android-app utviklet i fellesskap.', university: 'Universitetet i Oslo · IN2000 · 2024',
    credit: 'Nettside laget av Dichino Nguyen', backToTop: 'Tilbake til toppen',
  },
};

export const processCopy = { en, nb };
