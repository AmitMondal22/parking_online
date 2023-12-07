const dashboard=async (req,res)=>{
    try{
        page_data={
            title:"Dashboard",
            page_path:'dashboard/dashboard',
        }
        res.render('common/layouts/main',page_data);
    }catch(err){
        res.render('auth/login');
    }
}


const blank=async (req,res)=>{
    try{
        page_data={
            title:"blank",
            page_path:'blank/bkank',
        }
        req.flash('success', "Blank Page");
        res.render('common/layouts/main',page_data);
    }catch(err){
        res.render('/login');
    }
}

module.exports = {dashboard, blank};