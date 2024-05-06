export enum DialogDetails {
  CreateTitle = 'Crear Rutina',
  UpdateTitle = 'Editar Rutina',
  ConfirmDelete = 'Estas seguro de que quieres eliminar este entrenamiento?',
}

export enum WorkoutCardDetails {
  NewCardName = 'Test workout',
  UpdatedCardName = 'Test workout updated',
}

export const toastMessage = {
  status: {
    success: 'Success',
    error: 'Error',
  },
  message: {
    successCreated: `Rutina "${ WorkoutCardDetails.NewCardName }" creada con éxito`,
    successUpdated: `Rutina "${ WorkoutCardDetails.UpdatedCardName }" actualizada con éxito`,
    successDeleted: `Rutina "${ WorkoutCardDetails.UpdatedCardName }" eliminada con éxito`,
  }
}