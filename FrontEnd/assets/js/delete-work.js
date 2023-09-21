/*Requete pour supprimer un élément dans l'API*/
export async function deleteWork(id) {
    const token = sessionStorage.getItem('token');
    const deleterequest = await fetch("http://localhost:5678/api/works/" + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (deleterequest.ok) {
        const deletedWork = document.querySelectorAll(`[data-id="${id}"]`);
        //Supprime l'élément de la modale
        if (deletedWork && deletedWork.length > 0) {
            for (var i = 0; i < deletedWork.length; i++) {
                deletedWork[i].remove();
            }
        }
    }
    else {
        alert('Une erreur est survenue');
    }
}