import { Roles } from '../models';

export const isInRole = (roles: any, userRole: any) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    if (Array.isArray(roles)) {
        if (userRole && Array.isArray(userRole)) {
            return roles.some(r => userRole.includes(r));
        } else {
            return roles.includes(userRole);
        }
    }
    return false;
};

const imageType = ['jpeg', 'jpg', 'png', 'bmp', 'svg'];
const videoType = ['mp4', 'avi', 'wmv', 'mov', 'rmvb'];
const doc = ['doc', 'docx'];
const excel = ['xls', 'xlsx'];

export const getMediaType = (mediaUrl) => {
    const ext = mediaUrl.split('.').pop().toLowerCase();
    if (imageType.includes(ext)) {
        return 'image';
    } else if (ext === 'pdf') {
        return 'pdf';
    } else if (videoType.includes(ext)) {
        return 'video';
    } else if (doc.includes(ext)) {
        return 'doc';
    } else if (excel.includes(ext)) {
        return 'excel';
    } else {
        return 'others';
    }
};

export const findLongestWord = (str) => {
    const longestWord = str.split(' ').reduce(function(longest, currentWord) {
        return currentWord.length > longest.length ? currentWord : longest;
    }, '');
    return longestWord.length;
};

export const getDataFromError = (err) => {
    if (err && err.data) {
        return err.data;
    } else {
        return null;
    }
};

export const getErrorDetail = (err) => {
    if (err && err.err && err.err.desc) {
        return err.err.desc;
    } else {
        return '';
    }
};

export const getErrorCode = (err) => {
    if (err && err.err && err.err.code) {
        return err.err.code;
    } else {
        return '';
    }
};

export const addLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
};

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
