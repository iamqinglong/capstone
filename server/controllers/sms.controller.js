const mongoose = require('mongoose')
const Sms = mongoose.model('Sms')


module.exports.create = async (req,res,next) => {
    // res.send('Greetings from the Device controller!');

    

   try {

        let sms = new Sms(
            {
                number: req.body.number,
                
            }
        );
        await sms.save()

        return res.status(200).send({status: true , 'message':`Phone number saved successfully`})
   } catch (error) {
       return next(error)
   }
    
}

