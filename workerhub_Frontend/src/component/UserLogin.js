import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';

const UserLogin = () => {
  const location = useLocation();
  const user = location.state?.userData;
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterText, setFilterText] = useState('');
  const [field, setField] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/user/allworkers')
      .then(response => response.data)
      .then(data => setWorkers(data));
  }, []);


  return (
    <div  style={{ backgroundImage: 'url(/login3.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',height:'730px' }}>
      <UserNavBar />
      <div className="container">
        <h2 style={{textAlign:'center',color:'black',marginTop:'20px'}}>Worker's Details</h2>
        <div className="row mb-3">
          <div className="col-md-4">
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Filter by pincode" />
          </div>
          <div className="col-md-4">
  <select value={field} onChange={(e) => setField(e.target.value)} className="form-control">
    <option value="">Select a Service</option>
    <option value="HOUSE_KEEPING">HOUSE_KEEPING</option>
    <option value="PLUMBER">PLUMBER</option>
    <option value="ELECTRICIAN">ELECTRICIAN</option>
    <option value="ELECTRONICS">ELECTRONICS</option>
    <option value="DRIVER">DRIVER</option>
    <option value="COOK">COOK</option>
    <option value="MECHANIC">MECHANIC</option>
    <option value="BABYSITTER">BABYSITTER</option>
    <option value="PAINTER">PAINTER</option>
    <option value="CARPENTER">CARPENTER</option>
    <option value="LABOUR">LABOUR</option>
    <option value="GARDENER">GARDENER</option>
    <option value="PRIEST">PRIEST</option>
    <option value="PESTCONTROL">PESTCONTROL</option>
    <option value="SECURITY_GUARD">SECURITY_GUARD</option>
    <option value="TRANSPORT">TRANSPORT</option>
  </select>
</div>
        </div>
        <div style={{ maxHeight: '520px', overflowY: 'auto' }}>
        <table className="table table-striped">
          <thead style={{position:'sticky',zIndex:'1',top:'0'}}>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Visiting-Charge</th>
              <th>Pincode</th>
              <th>Service</th>
              <th>View</th>
              <th>Appointment</th>
            </tr>
          </thead>
          <tbody>
            {workers.filter(worker => worker.pincode.includes(searchText) && (field === '' || worker.field === field)).map(worker => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>{worker.phone}</td>
                <td>{worker.vcharge}</td>
                <td>{worker.pincode}</td>
                <td>{worker.field}</td>
                <td>
                <Link to={`/worker/${worker.id}`} state={{ worker, userData:user } }   className="btn btn-primary">View</Link>
                </td>
                <td>
                <Link to={`/user/appointment/${worker.id}`} state={ {worker, userData:user} }  className="btn btn-primary">Book Appointment</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
