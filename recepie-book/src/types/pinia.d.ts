import 'pinia';

// sa "declare module 'pinia' {}" radimo ekstenziju modula pinia i u pinia modul dodajemo tipove
// pinia modul prvo mora da se importuje kao sto je gore uradjeno
declare module 'pinia' {
  // radimo extend interfejsa PiniaCustomProperties i dodajemo mu custom tipove
  // PiniaCustomProperties je interfejs u pinia modulu
  export interface PiniaCustomProperties {
    secret: string;
  }
}
