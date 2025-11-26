import axios from 'axios';
import { API, getAuthHeaders } from '../App';

export const sendFriendRequest = async (receiverId) => {
    const response = await axios.post(
        `${API}/friends/request/${receiverId}`,
        {},
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const getIncomingRequests = async () => {
    const response = await axios.get(
        `${API}/friends/requests/incoming`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const getOutgoingRequests = async () => {
    const response = await axios.get(
        `${API}/friends/requests/outgoing`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const acceptRequest = async (requestId) => {
    const response = await axios.post(
        `${API}/friends/accept/${requestId}`,
        {},
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const rejectRequest = async (requestId) => {
    const response = await axios.post(
        `${API}/friends/reject/${requestId}`,
        {},
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const getFriendsList = async () => {
    const response = await axios.get(
        `${API}/friends/list`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const removeFriend = async (friendId) => {
    const response = await axios.delete(
        `${API}/friends/remove/${friendId}`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};

export const checkFriendshipStatus = async (userId) => {
    const response = await axios.get(
        `${API}/friends/status/${userId}`,
        { headers: getAuthHeaders() }
    );
    return response.data;
};
