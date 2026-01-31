const AlertModal = ({ open, text_alert, onConfirm, onCancel }) => {
  // Ne pas afficher si open est false
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-red-600 mb-2">Confirmation</h2>
          <p className="text-gray-700">{text_alert}</p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;