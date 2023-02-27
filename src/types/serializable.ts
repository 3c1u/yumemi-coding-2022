export type SerializableAtom = string | number | boolean | null

export type Serializable =
  | SerializableAtom
  | Serializable[]
  | { [key: string]: Serializable }
