import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import * as notificationsApi from '../services/notificationsApi';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'sonner';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        fetchUnreadCount();
        // Poll for notifications every 30 seconds
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchUnreadCount = async () => {
        try {
            const data = await notificationsApi.getUnreadNotifications();
            setUnreadCount(data.count);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const data = await notificationsApi.getAllNotifications();
            setNotifications(data.notifications || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = () => {
        if (!isOpen) {
            fetchNotifications();
        }
        setIsOpen(!isOpen);
    };

    const handleMarkAsRead = async (id, e) => {
        e.stopPropagation();
        try {
            await notificationsApi.markAsRead(id);
            setNotifications(notifications.map(n =>
                n.id === id ? { ...n, read: true } : n
            ));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            toast.error('Failed to mark as read');
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await notificationsApi.markAllAsRead();
            setNotifications(notifications.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
            toast.success('All marked as read');
        } catch (error) {
            toast.error('Failed to mark all as read');
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        try {
            await notificationsApi.deleteNotification(id);
            setNotifications(notifications.filter(n => n.id !== id));
            // If it was unread, decrease count
            const notification = notifications.find(n => n.id === id);
            if (notification && !notification.read) {
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (error) {
            toast.error('Failed to delete notification');
        }
    };

    const handleNotificationClick = async (notification) => {
        if (!notification.read) {
            await handleMarkAsRead(notification.id, { stopPropagation: () => { } });
        }
        setIsOpen(false);
        if (notification.link) {
            navigate(notification.link);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={handleToggle}
            >
                <Bell className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </Button>

            {isOpen && (
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-xl shadow-2xl border z-50 overflow-hidden ${theme === 'dark'
                        ? 'bg-gray-900 border-gray-800'
                        : 'bg-white border-gray-200'
                    }`}>
                    <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
                        }`}>
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Notifications
                        </h3>
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleMarkAllRead}
                                className="text-xs h-8 text-cyan-500 hover:text-cyan-400"
                            >
                                Mark all read
                            </Button>
                        )}
                    </div>

                    <ScrollArea className="h-[400px]">
                        {loading ? (
                            <div className="p-8 text-center text-slate-500">Loading...</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center">
                                <Bell className="w-12 h-12 text-slate-600 mb-3 opacity-50" />
                                <p className="text-slate-500">No notifications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-800/50">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`p-4 cursor-pointer transition-colors relative group ${!notification.read
                                                ? (theme === 'dark' ? 'bg-cyan-900/10' : 'bg-blue-50')
                                                : (theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50')
                                            }`}
                                    >
                                        <div className="flex gap-3">
                                            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notification.read ? 'bg-cyan-500' : 'bg-transparent'
                                                }`} />

                                            <div className="flex-1 min-w-0">
                                                <h4 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                    {notification.title}
                                                </h4>
                                                <p className={`text-sm mb-2 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                                                    }`}>
                                                    {notification.message}
                                                </p>
                                                <span className="text-xs text-slate-500">
                                                    {new Date(notification.created_at).toLocaleDateString()} • {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {!notification.read && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 hover:bg-cyan-500/20 hover:text-cyan-400"
                                                        onClick={(e) => handleMarkAsRead(notification.id, e)}
                                                        title="Mark as read"
                                                    >
                                                        <Check className="w-3 h-3" />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 hover:bg-red-500/20 hover:text-red-400"
                                                    onClick={(e) => handleDelete(notification.id, e)}
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
