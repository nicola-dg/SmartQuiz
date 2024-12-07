import { DataTypes, Model } from "sequelize";
class Esiti extends Model {
    static initialize(sequelize) {
        Esiti.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true // Assicurati che 'id' sia auto-incrementante se necessario
            },
            username: {
                type: DataTypes.STRING,
                allowNull: true
            },
            punteggio: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isQuizSuperato: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        }, {
            sequelize, // Usa 'sequelize' come chiave nella configurazione
            tableName: 'esiti', // Specifica il nome della tabella nel database (opzionale)
            timestamps: false // Aggiungi timestamps se non vuoi i campi 'createdAt' e 'updatedAt' (opzionale)
        });
    }
}
export { Esiti };
