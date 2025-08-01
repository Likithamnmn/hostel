import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dailyMenuSchema = new Schema({
    breakfast: {
        type: String,
        required: true,
        default: 'Not Set'
    },
    lunch: {
        type: String,
        required: true,
        default: 'Not Set'
    },
    dinner: {
        type: String,
        required: true,
        default: 'Not Set'
    }
}, { _id: false }); // _id: false prevents Mongoose from creating an id for this subdocument.(i dont know ablut this)

// This schema holds the entire weekly menu for one hostel.
const menuSchema = new Schema({
    // Each menu document is unique to a single hostel.
    hostelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true,
        unique: true // false if we are not doing seperate hostel boys and girls
    },
    monday: { type: dailyMenuSchema, required: true },
    tuesday: { type: dailyMenuSchema, required: true },
    wednesday: { type: dailyMenuSchema, required: true },
    thursday: { type: dailyMenuSchema, required: true },
    friday: { type: dailyMenuSchema, required: true },
    saturday: { type: dailyMenuSchema, required: true },
    sunday: { type: dailyMenuSchema, required: true }
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;