const listHour = [
    { 'id': 1, 'hour': 0, 'minute': 0 },
    { 'id': 2, 'hour': 0, 'minute': 15 },
    { 'id': 3, 'hour': 0, 'minute': 30 },
    { 'id': 4, 'hour': 0, 'minute': 45 },
    { 'id': 5, 'hour': 1, 'minute': 0 },
    { 'id': 6, 'hour': 1, 'minute': 15 },
    { 'id': 7, 'hour': 1, 'minute': 30 },
    { 'id': 8, 'hour': 1, 'minute': 45 },
    { 'id': 9, 'hour': 2, 'minute': 0 },
    { 'id': 10, 'hour': 2, 'minute': 15 },
    { 'id': 11, 'hour': 2, 'minute': 30 },
    { 'id': 12, 'hour': 2, 'minute': 45 },
    { 'id': 13, 'hour': 3, 'minute': 0 },
    { 'id': 14, 'hour': 3, 'minute': 15 },
    { 'id': 15, 'hour': 3, 'minute': 30 },
    { 'id': 16, 'hour': 3, 'minute': 45 },
    { 'id': 17, 'hour': 4, 'minute': 0 },
    { 'id': 18, 'hour': 4, 'minute': 15 },
    { 'id': 19, 'hour': 4, 'minute': 30 },
    { 'id': 20, 'hour': 4, 'minute': 45 },
    { 'id': 21, 'hour': 5, 'minute': 0 },
    { 'id': 22, 'hour': 5, 'minute': 15 },
    { 'id': 23, 'hour': 5, 'minute': 30 },
    { 'id': 24, 'hour': 5, 'minute': 45 },
    { 'id': 25, 'hour': 6, 'minute': 0 },
    { 'id': 26, 'hour': 6, 'minute': 15 },
    { 'id': 27, 'hour': 6, 'minute': 30 },
    { 'id': 28, 'hour': 6, 'minute': 45 },
    { 'id': 29, 'hour': 7, 'minute': 0 },
    { 'id': 30, 'hour': 7, 'minute': 15 },
    { 'id': 31, 'hour': 7, 'minute': 30 },
    { 'id': 32, 'hour': 7, 'minute': 45 },
    { 'id': 33, 'hour': 8, 'minute': 0 },
    { 'id': 34, 'hour': 8, 'minute': 15 },
    { 'id': 35, 'hour': 8, 'minute': 30 },
    { 'id': 36, 'hour': 8, 'minute': 45 },
    { 'id': 37, 'hour': 9, 'minute': 0 },
    { 'id': 38, 'hour': 9, 'minute': 15 },
    { 'id': 39, 'hour': 9, 'minute': 30 },
    { 'id': 40, 'hour': 9, 'minute': 45 },
    { 'id': 41, 'hour': 10, 'minute': 0 },
    { 'id': 42, 'hour': 10, 'minute': 15 },
    { 'id': 43, 'hour': 10, 'minute': 30 },
    { 'id': 44, 'hour': 10, 'minute': 45 },
    { 'id': 45, 'hour': 11, 'minute': 0 },
    { 'id': 46, 'hour': 11, 'minute': 15 },
    { 'id': 47, 'hour': 11, 'minute': 30 },
    { 'id': 48, 'hour': 11, 'minute': 45 },
    { 'id': 49, 'hour': 12, 'minute': 0 },
    { 'id': 50, 'hour': 12, 'minute': 15 },
    { 'id': 51, 'hour': 12, 'minute': 30 },
    { 'id': 52, 'hour': 12, 'minute': 45 },
    { 'id': 53, 'hour': 13, 'minute': 0 },
    { 'id': 54, 'hour': 13, 'minute': 15 },
    { 'id': 55, 'hour': 13, 'minute': 30 },
    { 'id': 56, 'hour': 13, 'minute': 45 },
    { 'id': 57, 'hour': 14, 'minute': 0 },
    { 'id': 58, 'hour': 14, 'minute': 15 },
    { 'id': 59, 'hour': 14, 'minute': 30 },
    { 'id': 60, 'hour': 14, 'minute': 45 },
    { 'id': 61, 'hour': 15, 'minute': 0 },
    { 'id': 62, 'hour': 15, 'minute': 15 },
    { 'id': 63, 'hour': 15, 'minute': 30 },
    { 'id': 64, 'hour': 15, 'minute': 45 },
    { 'id': 65, 'hour': 16, 'minute': 0 },
    { 'id': 66, 'hour': 16, 'minute': 15 },
    { 'id': 67, 'hour': 16, 'minute': 30 },
    { 'id': 68, 'hour': 16, 'minute': 45 },
    { 'id': 69, 'hour': 17, 'minute': 0 },
    { 'id': 70, 'hour': 17, 'minute': 15 },
    { 'id': 71, 'hour': 17, 'minute': 30 },
    { 'id': 72, 'hour': 17, 'minute': 45 },
    { 'id': 73, 'hour': 18, 'minute': 0 },
    { 'id': 74, 'hour': 18, 'minute': 15 },
    { 'id': 75, 'hour': 18, 'minute': 30 },
    { 'id': 76, 'hour': 18, 'minute': 45 },
    { 'id': 77, 'hour': 19, 'minute': 0 },
    { 'id': 78, 'hour': 19, 'minute': 15 },
    { 'id': 79, 'hour': 19, 'minute': 30 },
    { 'id': 80, 'hour': 19, 'minute': 45 },
    { 'id': 81, 'hour': 20, 'minute': 0 },
    { 'id': 82, 'hour': 20, 'minute': 15 },
    { 'id': 83, 'hour': 20, 'minute': 30 },
    { 'id': 84, 'hour': 20, 'minute': 45 },
    { 'id': 85, 'hour': 21, 'minute': 0 },
    { 'id': 86, 'hour': 21, 'minute': 15 },
    { 'id': 87, 'hour': 21, 'minute': 30 },
    { 'id': 88, 'hour': 21, 'minute': 45 },
    { 'id': 89, 'hour': 22, 'minute': 0 },
    { 'id': 90, 'hour': 22, 'minute': 15 },
    { 'id': 91, 'hour': 22, 'minute': 30 },
    { 'id': 92, 'hour': 22, 'minute': 45 },
    { 'id': 93, 'hour': 23, 'minute': 0 },
    { 'id': 94, 'hour': 23, 'minute': 15 },
    { 'id': 95, 'hour': 23, 'minute': 30 },
    { 'id': 96, 'hour': 23, 'minute': 45 },
]

export default listHour;