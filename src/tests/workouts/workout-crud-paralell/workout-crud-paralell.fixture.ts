import { type Page, test as base } from '@playwright/test';
import { WorkoutPage } from '@/pom/workout/pages/workout-page.pom';
import { WorkoutForm } from '@/pom/workout/components/workout-form.pom';

interface WorkoutCrudFixture {
  workoutPage: WorkoutPage;
  workoutForm: WorkoutForm;
}