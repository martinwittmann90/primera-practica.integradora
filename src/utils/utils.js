const validateNumber = (number) => {
    return number && !isNaN(number) && number > 0;
  };
  
  export { validateNumber };

//----------------MONGO------------------------------
import { connect } from 'mongoose';

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://martinwittmann90:iC00uo5o@projectmartinwittmann.l8a7l5b.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("Plug to mongo");
  } catch (e) {
    console.log(e);
    throw "Can not connect to the db";
  }
}
