const LoginForm = ({
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
  }) => (
    <form onSubmit={handleSubmit} className="mt-3">
      {/* <div className="form-group mb-3">
        <label className="form-label">Your Name </label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div> */}
  
      <div className="form-group mb-3">
        <label className="form-label d-flex">Email Address <p className = 'text-danger m-200'>*</p> </label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
  
      <div className="form-group mb-3">
        <label className="form-label">Password </label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
  
      <button disabled ={!email || !password} className="btn btn-primary">Submit</button>
    </form>
  );
  
  export default LoginForm;
  