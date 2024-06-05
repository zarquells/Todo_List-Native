import * as SQLite from 'expo-sqlite';

const tasks = SQLite.openDatabaseAsync('task.db');

export default tasks();