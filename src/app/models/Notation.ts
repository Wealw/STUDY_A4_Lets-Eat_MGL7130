export class Notation {
  id?: string
  note: number
  idClient: string

  constructor(
    id: string,
    note: number,
    idClient: string,
  ) {
    this.id = id;
    this.note = note;
    this.idClient = idClient;
  }
}
