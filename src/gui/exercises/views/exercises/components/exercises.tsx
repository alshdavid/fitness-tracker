import React, { memo } from 'react';
import * as exercise from '~/platform/exercise'

const getAveragReps = (sets: exercise.Set[]) => sets.reduce((p, c) => p + c.reps, 0) / sets.length
const getAverageWeight = (sets: exercise.Set[]) => sets.reduce((p, c) => p + c.weight, 0) / sets.length
const getLiftdex = (sets: exercise.Set[]) => sets.reduce((p, c) => p + c.weight * c.reps,0)

interface ExercisesProps {
    list: exercise.Exercise[]
}

export const Exercises = memo<ExercisesProps>(({ list, children }) => <div>
    { 
        list.map(item => (
            <div
                key={item.id}
                className="item">
                <div className="title">
                    { item.movement }
                </div>
                <div className="table">
                    <div>
                        <div>Reps</div>
                        <div>{ getAveragReps(item.sets) }</div>
                    </div>
                    <div>
                        <div>Weight</div>
                        <div>{ getAverageWeight(item.sets) }</div>
                    </div>
                    <div>
                        <div>Liftdex</div>
                        <div>{ getLiftdex(item.sets) }</div>
                    </div>
                </div>
            </div>
        ))
    }
</div>)