import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/solid";


function Register() {
    
      const [isVisible, setIsVisible] = useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <section>
      <div>
        <h2>Create Account</h2>
        <form>
          <Input type="email" label="Email" id="email" />
          <Input
            label="Password"
            id="password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashIcon className="text-2xl pointer-events-none" />
                ) : (
                  <EyeIcon className="text-2xl  pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
          />
          <Button>Create Account</Button>
        </form>
      </div>
      <div>
        <p>
          Aleady have an account? <Link to="/">Log In</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
