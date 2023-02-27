export type PopulationData = {
  year: number
  value: number
  rate?: number
}

export type PopulationDataset = {
  label: string
  data: PopulationData[]
}

export type PopulationComposition = {
  boundaryYear: number
  data: PopulationDataset[]
}
