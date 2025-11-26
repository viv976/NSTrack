import axios from 'axios';
import { API, getAuthHeaders } from '../App';

export const getUnreadNotifications = async () => {
    const response = await axios.get(
        `${API}/notifications/unread`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const getAllNotifications = async () => {
    const response = await axios.get(
        `${API}/notifications`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const markAsRead = async (notificationId) => {
    const response = await axios.post(
        `${API}/notifications/${notificationId}/read`,
        {},
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const markAllAsRead = async () => {
    const response = await axios.post(
        `${API}/notifications/mark-all-read`,
        {},
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const deleteNotification = async (notificationId) => {
    const response = await axios.delete(
        `${API}/notifications/${notificationId}`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};
