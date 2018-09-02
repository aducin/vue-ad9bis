const config = {
  currency: 'zł',
  defaultUrl: 'product',
  imageUrl: 'http://modele-ad9bis.pl/img/p/',
  linkUrl: 'http://ad9bis.vot.pl/',
  linkSuffix: 'wagony-towarowe/',
  mailSuffix: 'cms_spa/web/orders/',
  options: {
    actions: [
      { value: 1, text: 'Sprawdź kupon' },
      { value: 2, text: 'Oblicz 15% rabat' },
      { value: 3, text: 'Wyślij ponowny mail (NP)' },
      { value: 4, text: 'Wyślij ponowny mail (SP)' }
    ],
    active: [
      { value: 1, text: 'Aktywny' },
      { value: 0, text: 'Nieaktywny' }
    ],
    orderDetailHeaders: ['Miniatura', 'Numer ID', 'Nazwa', 'Na stanie', 'Drugi sklep', 'Zamówione', 'Opcje'],
    orderEvenHeaders: [
      {id: 1, name: 'Miniatura'},
      {id: 2, name: 'Numer ID'},
      {id: 3, name: 'Nazwa'},
      {id: 4, name: 'Ilość (zakup)'},
      {id: 5, name: 'Ilość'},
      {id: 6, name: 'Przed'},
      {id: 7, name: 'Po'},
      {id: 8, name: 'Akcje'}
    ],
    orderVoucherHeaders: ['Numer ID', 'Referencja', 'Produkty', 'Transport', 'Data', 'Numer kuponu'],
    orders: [
      { value: 1, text: 'Nowy Panel' },
      { value: 2, text: 'Stary Panel' }
    ],
    productHistoryHeaders: ['Lp.', 'Data', 'Ilość', 'Miejsce', 'Sklep'],
    productListHeaders: ['ID', 'Miniatura', 'Nazwa', 'Ilość', 'Cena SP', 'Cena NP', 'Akcje'],
    states: [
      { value: 1, text: 'Otwarty' },
      { value: 2, text: 'Zamknięty' },
      { value: 3, text: 'Nieodebrany' }
    ],
    postalHeaders: ['Lp.', 'Kwota', 'Data'],
    types: [
      { value: 1, text: 'Przelew' },
      { value: 2, text: 'Pobranie' },
      { value: 3, text: 'Usł. inf.' },
      { value: 4, text: 'Sprzedaż bezp.' },
      { value: 5, text: 'Zwrot' }
    ]
  },
  timer: 3000,
  timerCookie: 260000,
  url: 'http://local.angular/try.php'
}
export default config
