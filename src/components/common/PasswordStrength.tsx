import { FaCheck } from "react-icons/fa6";

type Props = {
  password: string;
};

export const PasswordStrength = ({ password }: Props) => {
  const rules = [
    {
      label: "At least 8 characters",
      test: password.length >= 8,
    },
    {
      label: "Contains uppercase letter",
      test: /[A-Z]/.test(password),
    },
    {
      label: "Contains lowercase letter",
      test: /[a-z]/.test(password),
    },
    {
      label: "Contains number",
      test: /[0-9]/.test(password),
    },
    {
      label: "Contains special character",
      test: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
    },
  ];

  const allValid = rules.every((r) => r.test);

  return (
    <div className="mt-4">
      {/* 
 {allValid && (
 <p style={{ color: "green" }}>
' ✔ Strong password'
 </p>
 )}
*/}

      {!allValid && (
        <div className="bg-gray-50 shadow px-2 py-2">
          {rules.map((rule, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
                fontSize: "14px",
              }}
            >
              {/* ICON */}
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: "2px solid",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: rule.test ? "green" : "gray",
                  borderColor: rule.test ? "green" : "gray",
                }}
              >
                {rule.test ? <FaCheck /> : ""}
              </span>

              {/* LABEL */}
              <span
                style={{
                  color: rule.test ? "green" : "gray",
                }}
              >
                {rule.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
