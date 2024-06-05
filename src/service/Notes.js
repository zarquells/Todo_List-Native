import tasks from '../db/index';

export function createTable(){
    tasks.transaction((tx) => {
        tx.executeSQL(
            `CREATE TABLE IF NOT EXISTS Tasks (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                title       TEXT,
                category    TEXT,
                description TEXT
            )
            `,
            [],
            (_, error) => {
                console.log('Algo deu errado na criação de tabela: ' + error);
            }
        )
    })
}

export async function createTask(task){
    return new Promise((resolve, reject) => {
        tasks.transaction((tx) => {
            tx.executeSQL(
                `
                    INSERT INTO desks(title, category, description) 
                    VALUES (?, ?, ?);
                `,
                [
                    task.title,
                    task.category,
                    task.description
                ],
                (_,
                 ({rowsAffected, insertId}) => {
                    if(rowsAffected > 0) resolve(insertId);
                    else reject 
                    ('Algo deu errado ao tentar adicionar uma nova nota!1: ' + JSON.stringify);
                 },
                 (_, error) => {
                    reject('Algo deu errado ao tentar adicionar uma nova nota!2:' + error)
                 }
                )

            )
        })
    })
}

export async function selectTask(category = '*'){
    return new Promise((resolve, reject) => {
        tasks.transaction((tx) => {
            let comand;
            if(category = '*'){
                comand = 'SELECT * FROM tasks';
            }else {
                comand = 'SELECT * FROM tasks WHERE categoria = "${category}";';
            }

            tx.executeSQL(comand, [],
                (transaction, result) => {
                    resolve(result,rows._array);
                },
                (_, error) => reject('Algo deu errado ao tentar carregar a(s) nota(s): ' + error)
            )
        })
    })
}

export async function updateTask(task){
    return new Promise((resolve, reject) => {
        tasks.transaction((tx) => {
            tx.executeSQL(
                `
                    UPDATE tasks SET title=?, category=?, description=? WHERE id=?;
                `,
                [
                    task.title,
                    task.category,
                    task.description,
                    task.id
                ],
                () => {
                    resolve('The task was updated successfully');
                },
                (_, error) => reject('Algo deu errado ao tentar atualizar a nota: ' + error)
            )
        })
    })
}

export async function deleteTask(id){
    return new Promise((resolve, reject) => {
        tasks.transaction((tx) => {
            tx.executeSQL(
                `
                    DELETE FROM tasks WHERE id=?;
                `,
                [
                    id
                ],
                () => {
                    resolve('The task was deleted successfully')
                },
                (_, error) => reject('Algo deu errado ao tentar deletar a nota: ' + error)
            )
        })
    })
}