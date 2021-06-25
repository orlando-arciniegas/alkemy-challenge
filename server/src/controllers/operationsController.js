import Operation from '../models/Operation';

const operationsController = {
    index: (req, res) => {

        try {

            Operation.findAll(
                {
                    limit: 10,
                    order: 
                [
                    ['id', 'DESC']
                ]
            }).then(operations => {
                        
                let response = {
                    meta: {
                        status: 200,
                        total: operations.length,
                        url: "/"
                    },
                    data: operations
                }
                return res.status(200).json(response)
        }) 
        } catch (error) {
            console.log(error)
        }
    },
    save: async (req, res) => {
        try {
            
            let newOperation = {
                concept: req.body.concept,
                amount: req.body.amount,
                type: req.body.type
            } 
            
            await Operation.create(newOperation);

            res.send("Operación creada satisfactoriamente.")
        } catch (error) {
            console.log(error)
        }
    },
    find: async (req, res) => {
        
        try {

            const oneOperation = await Operation.findOne({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json(oneOperation);

        } catch (error) {
            console.log(error)
        }
    },
    edit: async (req, res) => {
        
        try {
            
            let operation = {
                concept: req.body.concept,
                amount: req.body.amount
            }
            
            await Operation.update(operation, {
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json("Operación editada satisfactoriamente.");

        } catch (error) {
            console.log(error)
        }
    },
    destroy: async (req, res) => {

        try {
            
            await Operation.destroy({
                where: {
                    id: req.params.id
            }
            });
            res.status(200).json("Operación eliminada satisfactoriamente.");

        } catch (error) {
            console.log(error)
        }
    },
}

export default operationsController;