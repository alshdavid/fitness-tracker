import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment'
import { api, Exercise } from '../../lib'
const timeFormat = 'YYYY-MM-DD'

@Component({
    selector: 'app-view-exercises-edit',
    templateUrl: './exercises.edit.component.html',
    styleUrls: ['./exercises.edit.component.scss']
})
export class ExercisesEditViewComponent {
    public moment = moment
    public suggestions = []
    public exercise: Exercise = {
        id: '',
        date: '',
        movement: '',
        sets: [
            { reps: null, weight: null },
            { reps: null, weight: null },
            { reps: null, weight: null },
            { reps: null, weight: null }
        ],
    }
    public accordionState = {
        date: false,
        movement: true,
        sets: false
    }

    constructor(
        private ngRouter: Router,
        private ngActivatedRoute: ActivatedRoute
    ) {}

    async ngOnInit() {
        let id = this.ngActivatedRoute.snapshot.params.id
        this.exercise = await api.getExercise(id)
    }

    addRep() {
        this.exercise.sets.push({ reps: undefined, weight: undefined })
    }

    removeRep(i) {
        this.exercise.sets.splice(i, 1)
    }

    openTab(tab) {
        let state = this.accordionState[tab]

        Object.keys(this.accordionState)
            .forEach(i => this.accordionState[i] = false)

        this.accordionState[tab] = !state
    }

    async search() {
        if (!this.exercise.movement) {
            this.suggestions = []
            return 
        }
        this.suggestions = await api.searchMovements(this.exercise.movement.toLocaleLowerCase())
    }

    selectSearch(value) {
        this.suggestions = []
        this.exercise.movement = value
    }

    async submit() {
        let output = this.exercise
        if (!output.movement) {
            return
        }
        output.sets = output.sets.filter(({ reps, weight }) => reps || weight)
        
        await api.updateExercise(output)

        this.ngRouter.navigate(['/exercises', 'detail', this.exercise.id ])
    }

    async remove() {
        if (!confirm('Are you sure')) {
            return
        }
        await api.removeExerciseById(this.exercise.id)
        this.ngRouter.navigate(['/exercises'])
    }
}