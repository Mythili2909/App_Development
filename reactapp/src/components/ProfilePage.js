// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext'; // Adjust the import path accordingly
// import '../assets/style/ProfilePage.css';
// import defaultAvatar from '../assets/images/login img.png';
// import { Link } from 'react-router-dom';

// const ProfilePage = () => {
//   const { user, updateUser } = useAuth(); // Removed uploadUserPhoto as it's not defined
//   const [formData, setFormData] = useState({
//     email: '',
//     name: '',
//     photo: defaultAvatar,
//     mobile: '',
//     degree: '',
//     linkedin: '',
//     github: '',
//     skills: '',
//     experience: '',
//     certifications: '',
//     bio: '',
//   });
//   const [photoPreview, setPhotoPreview] = useState(defaultAvatar);
//   const [photoFile, setPhotoFile] = useState(null); // To store the file for uploading

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         email: user.email || '',
//         name: user.name || '',
//         photo: user.photo || defaultAvatar,
//         mobile: user.mobile || '',
//         degree: user.degree || '',
//         linkedin: user.linkedin || '',
//         github: user.github || '',
//         skills: user.skills?.join(', ') || '',
//         experience: user.experience || '',
//         certifications: user.certifications || '',
//         bio: user.bio || '',
//       });
//       setPhotoPreview(user.photo || defaultAvatar);
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     setPhotoPreview(URL.createObjectURL(file));
//     setPhotoFile(file); // Set the file to photoFile
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Assuming updateUser handles photo upload if photoFile is set
//     updateUser({ ...formData, photo: photoFile });
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-page">
//       <h2 className="profile-page-title">Your Profile</h2>
//       <button className='dashboard-button'><Link to='/user-dashboard'>Dashboard</Link></button>
//       <br></br>
//       <div className="profile-photo-container">
//         <img src={photoPreview} alt="Profile Preview" className="profile-photo-preview" />
//         <input type="file" id="photo" name="photo" onChange={handlePhotoChange} />
//       </div>
//       <div className="profile-cards">
//         <div className="profile-card">
//           <h3>Overall Rating</h3>
//           <p>NA</p>
//         </div>
//         <div className="profile-card">
//           <h3>Skill Level</h3>
//           <p>NA</p>
//         </div>
//         <div className="profile-card">
//           <h3>Experience</h3>
//           <p>NA</p>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit} className="profile-form">
//         <div className="profile-form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             disabled
//           />
//         </div>
//         <div className="profile-form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="profile-form-group">
//           <label htmlFor="mobile">Mobile Number:</label>
//           <input
//             type="text"
//             id="mobile"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="profile-form-group">
//           <label htmlFor="degree">Degree:</label>
//           <input
//             type="text"
//             id="degree"
//             name="degree"
//             value={formData.degree}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="profile-form-group">
//           <label htmlFor="linkedin">LinkedIn Profile:</label>
//           <input
//             type="url"
//             id="linkedin"
//             name="linkedin"
//             value={formData.linkedin}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="profile-form-group">
//           <label htmlFor="github">GitHub Profile:</label>
//           <input
//             type="url"
//             id="github"
//             name="github"
//             value={formData.github}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="profile-form-group">
//           <label htmlFor="skills">Skills (comma-separated):</label>
//           <input
//             type="text"
//             id="skills"
//             name="skills"
//             value={formData.skills}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="profile-form-group">
//           <label htmlFor="experience">Experience:</label>
//           <input
//             type="text"
//             id="experience"
//             name="experience"
//             value={formData.experience}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="profile-form-group">
//           <label htmlFor="certifications">Certifications:</label>
//           <input
//             type="text"
//             id="certifications"
//             name="certifications"
//             value={formData.certifications}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="profile-form-group">
//           <label htmlFor="bio">Bio:</label>
//           <textarea
//             id="bio"
//             name="bio"
//             value={formData.bio}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button className="save-button">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;
