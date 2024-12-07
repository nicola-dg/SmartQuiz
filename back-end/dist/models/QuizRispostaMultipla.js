import { DataTypes, Model } from "sequelize";
class QuizRispostaMultipla extends Model {
    checkAns(userAnswer) {
        return userAnswer == this.correctAnswer;
    }
    // override
    static initialize(sequelize) {
        QuizRispostaMultipla.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            numMaxError: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            link: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false
            },
            choices: {
                type: DataTypes.STRING,
                allowNull: false
            },
            correctAnswer: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize, // Usa 'sequelize' come chiave nella configurazione
            tableName: 'quiz_risposta_multipla', // Specifica il nome della tabella nel database (opzionale)
            timestamps: false // Aggiungi timestamps se non vuoi i campi 'createdAt' e 'updatedAt' (opzionale)
        });
    }
}
export { QuizRispostaMultipla };
