const EmployeeModel = require('../models/EmployeeModel');

const renderEmployeePage = async (req, res) => {
    try {
        const employees = await EmployeeModel.getEmployees();
        res.render('admin/employee/index', { employees });
    } catch (error) {
        res.status(500).send('Error loading employee page');
    }
};

module.exports = { renderEmployeePage };