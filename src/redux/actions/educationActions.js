import { json } from 'react-router-dom';
import * as actionTypes from './actionTypes'

export function getEducationsSuccess(educations) {
    return { type: actionTypes.GET_EDUCATIONS_SUCCESS, payload: educations }
}

export function getEducations(categoryId) {
    return function (dispatch) {
        let url = "http://localhost:3000/lessons";
        if (categoryId) {
            url += "?fk_education_category_id=" + categoryId
        }
        return fetch(url)
            .then(response => response.json())
            .then(result => dispatch(getEducationsSuccess(result)))
    }
}

export function createScormSuccess(scorm) {
    return { type: actionTypes.CREATE_SCORM_SUCCESS, payload: scorm }
}

export function updateScormSuccess(scorm) {
    return { type: actionTypes.UPDATE_SCORM_SUCCESS, payload: scorm }
}

export function saveScormApi(scorm) {
    return fetch("http://localhost:3000/scorms" + (scorm.id || ""),
        {
            method: scorm.id ? "PUT" : "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(scorm)
        }
    )
        .then(handleResponse)
        .catch(handeError)
}


export function saveScorm(scorm) {
    return function (dispatch) {
        return saveScormApi(scorm).then(savedScorm => {
            scorm.id
                ? dispatch(updateScormSuccess(savedScorm))
                : dispatch(createScormSuccess(savedScorm))
        }).catch(error => { throw error });
    }
}

export async function handeError(error) {
    console.log("Bir hata oluştu");
    throw new Error(error)
}

export async function handleResponse(response) {
    if (response.ok) {
        return response.json()
    }
    const error = await response.text()
    throw new Error(error)
}