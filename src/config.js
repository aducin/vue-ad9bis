const config = {
  ajaxConfig: {
    headers: {'X-My-Custom-Header': 'Header-Value'}
  },
  currency: 'zł',
  defaultUrl: 'product',
  imageUrl: 'http://modele-ad9bis.pl/img/p/',
  intervalOrders: 600000,
  linkUrl: 'http://ad9bis.vot.pl/',
  linkSuffix: 'wagony-towarowe/',
  mailSuffix: 'cms_spa/web/orders/',
  options: {
    accountHeaders: [
      { name: 'id', value: 'Lp.' },
      { name: 'recipient', value: 'Klient' },
      { name: 'address', value: 'Numer nadania' },
      { name: 'amountFloat', value: 'Kwota' },
      { name: 'type', value: 'Rodzaj' },
      { name: 'receipt', value: 'Nr paragonu' },
      { name: 'receiptTime', value: 'Data paragonu' },
      { name: 'cashTime', value: 'Data wpłaty' },
      { name: 'locs', value: 'Loks' },
      { name: 'coach', value: 'Wagony' },
      { name: 'element', value: 'Elementy' },
      { name: 'accessories', value: 'Części' },
      { name: 'book', value: 'Książki' },
      { name: 'car', value: 'Auta' },
      { name: 'remarks', value: 'Uwagi' }
    ],
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
    condition: [
      { value: 'new', text: 'Nowy' },
      { value: 'used', text: 'Używany' },
      { value: 'renewed', text: 'Odnowiony' }
    ],
    lastOrders: ['Numer', 'Referencja', 'Data', 'Suma', 'Przesyłka', 'Akcja'],
    modifiedHeaders: ['ID', 'Nazwa', 'Data', 'Akcja'],
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
    printingsHeaders: ['Lp.', 'Nazwa', 'Opis', 'Data', 'Akcja'],
    productHistoryHeaders: ['Lp.', 'Data', 'Ilość', 'Miejsce', 'Sklep'],
    productListHeaders: ['ID', 'Miniatura', 'Nazwa', 'Ilość', 'Cena SP', 'Cena NP', 'Akcje'],
    states: [
      { value: 0, text: 'Otwarty' },
      { value: 1, text: 'Zamknięty' },
      { value: 2, text: 'Nieodebrany' }
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
  printingUrl: 'http://modele-ad9bis.pl/cms_spa/files/printing/',
  timer: 3000,
  timerCookie: 260000,
  url: 'http://local.angular/try.php'
}
export default config
