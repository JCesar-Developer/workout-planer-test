export enum DialogDetails {
  CreateTitle = 'Crear Ejercicio',
  UpdateTitle = 'Editar Ejercicio',
  confirmDelete = 'Estas seguro de que quieres eliminar este ejercicio?',
}

export enum ExerciseCardDetails {
  CardToDeleteName = 'Test exercise for delete',
  CardToUpdateName = 'Test exercise for update',
  NewCardName = 'Test exercise',
  UpdatedCardName = 'Test exercise updated',
}

export const toastMessage = {
  successCreated: `Ejercicio "${ExerciseCardDetails.NewCardName}" creado con éxito`,
  successUpdated: `Ejercicio "${ExerciseCardDetails.UpdatedCardName}" actualizado con éxito`,
  successDeleted: `Ejercicio "${ExerciseCardDetails.CardToDeleteName}" eliminado con éxito`,
}