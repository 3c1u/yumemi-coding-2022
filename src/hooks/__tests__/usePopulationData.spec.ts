import { describe, expect, it } from 'vitest'
import { transformPopulationCompositionData } from '~/hooks/usePopulationData'
import { getPopulationCompositionPerYear } from '~/services/resas/populationCompositionPerYear'

describe('transformPopulationCompositionData', () => {
  it('should transform population composition data', async () => {
    const resGroup = await Promise.all(
      [1, 2, 3, 4].map(async prefCode => {
        const res = getPopulationCompositionPerYear({ prefCode })

        return res.then(
          r =>
            ({
              prefCode,
              res: r,
            } as const),
        )
      }),
    )

    const data = transformPopulationCompositionData(resGroup)
    expect(data).toEqual(
      Array.from(
        {
          length: 66,
        },
        (_, i) => ({
          year: 1980 + i,
          prefecture_1: 1000000,
          prefecture_2: 2000000,
          prefecture_3: 3000000,
          prefecture_4: 4000000,
        }),
      ),
    )
  })
})
