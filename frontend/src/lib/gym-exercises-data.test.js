import { describe, expect, it } from 'vitest'
import GYM_EXERCISES from './gym-exercises-data.js'
import { buildStarterPlan } from './starter.js'

describe('Tietou Gongshu gym catalogue', () => {
  it('contains all 103 PDF machines with stable unique ids and embedded PDF thumbnails', () => {
    expect(GYM_EXERCISES).toHaveLength(103)
    const ids = GYM_EXERCISES.map(ex => ex.id)
    expect(new Set(ids).size).toBe(103)
    for (const ex of GYM_EXERCISES) {
      expect(ex.id).toMatch(/^gym-[ABC]-\d{2}-\d{2}$/)
      expect(ex.gym).toBe(true)
      expect(ex.gymCode).toBe(ex.id.slice(4))
      expect(ex.imgData).toMatch(/^data:image\/webp;base64,/)
      expect(ex.desc).toContain('PDF目标肌群：')
    }
  })

  it('keeps every exercise in the 12-week starter plan inside the gym catalogue', () => {
    const ids = new Set(GYM_EXERCISES.map(ex => ex.id))
    const plan = buildStarterPlan('tietou-12w')
    expect(plan).toBeTruthy()
    for (const routine of plan.routines) {
      for (const ex of routine.ex) expect(ids.has(ex.id), ex.id).toBe(true)
    }
  })
})
