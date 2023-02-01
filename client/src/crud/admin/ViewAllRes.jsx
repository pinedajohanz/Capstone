import React, { useState, useEffect } from 'react'
import SideBarAdmin from "../../components/SideBarAdmin";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { FilterMatchMode } from "primereact/api"
import { InputText } from "primereact/inputtext"
import "../../dashboard/Dashboard.css"

function ViewAllRes() {

  const [filters, setFilters] = useState ({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS}
  })

  const [AllRes, setAllRes] = useState([]);
  
  // get all residents information to display in the table
  async function getAllRes() {
    const res = await fetch("http://localhost:5000/allresidents");

    // data stored in this Array
    const AllResArray = await res.json();

    // converts date format to MM/DD/YYYY
    AllResArray.forEach(residents => {
      residents.birthday = (new Date(residents.birthday)).toLocaleDateString()
    }); 
    
    // data transfer from array to setState then map it at table
    setAllRes(AllResArray);
  }

  // called after the component renders, if the [depend] have not changed, the effect will not run again.
  useEffect(() => {
    getAllRes();
  }, []);


  return (
    <>
    <div className='main'>
      <SideBarAdmin />
      <div className="container-table m-5 my-5 mx-5 text-bg-light">
      <div class="h4 pb-2 mb-4 my-3 mx-3 text-success border-bottom border-success">
        Residents Information
      </div>

      <InputText placeholder='Search' style={{width:500, marginLeft:15}}
      onInput={(e) =>
        setFilters({
          global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
        })
      } />

        <DataTable value={AllRes} rowHover filters={filters}>
          <Column field="resident_id" header={<p className=' text-success'>User ID</p>} sortable={true} />
          <Column field="first_name" header="First Name" sortable={true} />
          <Column field="middle_init" header="Middle Initial" sortable={true}/>
          <Column field="last_name" header={<p className=' text-success'>Last Name</p>} sortable={true}/>
          <Column field="birthday" header="Birthday" sortable={true}/>
          <Column field="subdivision_address" header="Subdivision" sortable={true} />
          <Column field="house_street_address" header="House Street" sortable={true}/>
          <Column field="contact_number" header="Contact Number" sortable={true}/>
          <Column field="email_address" header="Email" sortable={true}/>
        </DataTable>
      </div>

    </div>
    </>
  )
}

export default ViewAllRes



// OLD table working w/o sorting function
// return (
//   <>
//   <div className='main'>
//     <SideBarAdmin />
//     <div className="container-table m-5 text-bg-light">
//     <div class="h4 pb-2 mb-4 my-3 mx-3 text-success border-bottom border-success">
//       Residents Information
//     </div>
//         <table className="table table-hover table-shadow">
//             <thead className='table-success'>
//                 <tr>
//                 <th scope="col">User ID#</th>
//                 <th scope="col">First Name</th>
//                 <th scope="col">Middle Initial</th>
//                 <th scope="col">Last name</th>
//                 <th scope="col">Birthday</th>
//                 <th scope="col">Subdivision</th>
//                 <th scope="col">House Street</th>
//                 <th scope="col">Contact Number</th>
//                 <th scope="col">Email</th>

//                 </tr>
//             </thead>
//             <tbody>
//                 {/* maps over an array to display each item in a row from state */}
//                 {AllRes.map(Resident => (
//                   <tr>
//                     <td>{Resident.resident_id}</td>
//                     <td>{Resident.first_name}</td>
//                     <td>{Resident.middle_init}</td>
//                     <td>{Resident.last_name}</td>
//                     <td>{Resident.birthday}</td>
//                     <td>{Resident.subdivision_address}</td>
//                     <td>{Resident.house_street_address}</td>
//                     <td>{Resident.contact_number}</td>
//                     <td>{Resident.email_address}</td>
//                   </tr>
//                 ))

//                 }
//             </tbody>
//         </table>
//     </div>
//   </div>
//   </>
// )