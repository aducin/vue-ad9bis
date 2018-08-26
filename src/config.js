const config = {
  currency: 'zł',
  defaultUrl: 'product',
  options: {
    actions: [
      { value: 1, text: 'Sprawdź kupon' },
      { value: 2, text: 'Oblicz 15% rabat' },
      { value: 3, text: 'Wyślij ponowny mail (NP)' },
      { value: 4, text: 'Wyślij ponowny mail (SP)' }
    ],
    orders: [
      { value: 1, text: 'Nowy Panel' },
      { value: 2, text: 'Stary Panel' }
    ],
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
