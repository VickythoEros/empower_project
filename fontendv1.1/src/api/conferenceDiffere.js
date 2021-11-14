import axios from 'axios'

const conferenceDiffere = axios.create({
    baseURL: 'http://localhost:5000/conference_differe',
    withCredentials: true,
})

const insertConferenceDIffere = payload => conferenceDiffere.post(`/`, payload)
const getAllConferenceDiffere = () => conferenceDiffere.get(`/`)
const updateConferenceDiffereById = (id, payload) => conferenceDiffere.put(`/${id}`, payload)
const getConferenceDiffereById = id => conferenceDiffere.get(`/${id}`)
const deleteConferenceDiffereById = id => conferenceDiffere.delete(`/${id}`)
const getEventConferenceDiffere = id => conferenceDiffere.get(`/get_event_conference_differe/${id}`)
const deleteAllConferenceDiffereEvent = id => conferenceDiffere.delete(`/delete_all_conference_differe_event/${id}`)



const conferencesDiffere = {
    insertConferenceDIffere,
    getAllConferenceDiffere,
    updateConferenceDiffereById,
    getConferenceDiffereById,
    deleteConferenceDiffereById,
    getEventConferenceDiffere,
    deleteAllConferenceDiffereEvent,

}

export default conferencesDiffere;
