// 50 College / Senior Secondary Level Maths Questions
module.exports = [
  {
    question: "What is the value of lim (x -> 0) of (sin x) / x ?",
    option_a: "0",
    option_b: "1",
    option_c: "Infinity",
    option_d: "Undefined",
    correct_option: "B",
    explanation: "By standard limit definition or L'Hôpital's Rule, lim (x->0) (sin x)/x = 1."
  },
  {
    question: "If A is a 3x3 matrix and det(A) = 5, what is det(2A)?",
    option_a: "10",
    option_b: "20",
    option_c: "40",
    option_d: "80",
    correct_option: "C",
    explanation: "For an n x n matrix, det(k*A) = k^n * det(A). Here 2^3 * 5 = 8 * 5 = 40."
  },
  {
    question: "What is the derivative of f(x) = ln(3x^2 + 1)?",
    option_a: "6x / (3x^2 + 1)",
    option_b: "1 / (3x^2 + 1)",
    option_c: "3x / (3x^2 + 1)",
    option_d: "6 / (3x^2 + 1)",
    correct_option: "A",
    explanation: "Using chain rule: f'(x) = (1 / (3x^2 + 1)) * d/dx(3x^2 + 1) = 6x / (3x^2 + 1)."
  },
  {
    question: "What is the integral of e^(2x) dx?",
    option_a: "2 e^(2x) + C",
    option_b: "(1/2) e^(2x) + C",
    option_c: "e^(2x) + C",
    option_d: "(1/4) e^(2x) + C",
    correct_option: "B",
    explanation: "Integral of e^(kx) dx is (1/k) e^(kx) + C. Here k = 2."
  },
  {
    question: "What are the eigenvalues of the identity matrix I_3?",
    option_a: "0, 0, 0",
    option_b: "1, 1, 1",
    option_c: "1, 2, 3",
    option_d: "-1, 1, -1",
    correct_option: "B",
    explanation: "The characteristic equation of I is (1 - lambda)^3 = 0, giving eigenvalues 1, 1, 1."
  },
  {
    question: "If two vectors u and v are orthogonal, what is their dot product u . v ?",
    option_a: "1",
    option_b: "-1",
    option_c: "0",
    option_d: "||u|| * ||v||",
    correct_option: "C",
    explanation: "Two non-zero vectors are perpendicular/orthogonal if and only if their scalar product is 0."
  },
  {
    question: "What is the modulus of the complex number z = 3 - 4i?",
    option_a: "7",
    option_b: "5",
    option_c: "1",
    option_d: "25",
    correct_option: "B",
    explanation: "|z| = sqrt(3^2 + (-4)^2) = sqrt(9 + 16) = sqrt(25) = 5."
  },
  {
    question: "What is the order and degree of the differential equation (d^2y/dx^2)^3 + dy/dx + y = 0 ?",
    option_a: "Order 3, Degree 2",
    option_b: "Order 2, Degree 3",
    option_c: "Order 2, Degree 1",
    option_d: "Order 3, Degree 1",
    correct_option: "B",
    explanation: "The highest derivative is d^2y/dx^2 (order 2), and its power is 3 (degree 3)."
  },
  {
    question: "What is the value of the definite integral of sin(x) from -pi to pi?",
    option_a: "2",
    option_b: "0",
    option_c: "pi",
    option_d: "-2",
    correct_option: "B",
    explanation: "sin(x) is an odd function, and the integral of any odd function over [-a, a] is 0."
  },
  {
    question: "What is Euler's formula relating exponential and trigonometric functions?",
    option_a: "e^(ix) = cos(x) + i*sin(x)",
    option_b: "e^(ix) = sin(x) - i*cos(x)",
    option_c: "e^(ix) = cos(x) - i*sin(x)",
    option_d: "e^(ix) = i*cos(x) + sin(x)",
    correct_option: "A",
    explanation: "Euler's identity states e^(ix) = cos x + i sin x."
  },
  {
    question: "What is the sum of an infinite geometric series with first term a = 4 and common ratio r = 1/2 ?",
    option_a: "6",
    option_b: "8",
    option_c: "10",
    option_d: "12",
    correct_option: "B",
    explanation: "S = a / (1 - r) = 4 / (1 - 0.5) = 4 / 0.5 = 8."
  },
  {
    question: "What is the rank of a 3x3 matrix whose determinant is non-zero?",
    option_a: "1",
    option_b: "2",
    option_c: "3",
    option_d: "0",
    correct_option: "C",
    explanation: "A square matrix of order n with non-zero determinant has full rank equal to n (here 3)."
  },
  {
    question: "What is the derivative of arctan(x) with respect to x?",
    option_a: "1 / sqrt(1 - x^2)",
    option_b: "1 / (1 + x^2)",
    option_c: "-1 / (1 + x^2)",
    option_d: "1 / (1 - x^2)",
    correct_option: "B",
    explanation: "d/dx (arctan x) = 1 / (1 + x^2)."
  },
  {
    question: "What is the magnitude of the cross product of two parallel vectors?",
    option_a: "1",
    option_b: "Equal to product of lengths",
    option_c: "0",
    option_d: "-1",
    correct_option: "C",
    explanation: "||u x v|| = ||u|| ||v|| sin(theta). For parallel vectors theta = 0, so sin(0) = 0."
  },
  {
    question: "If a fair coin is tossed 3 times, what is the probability of getting exactly 2 heads?",
    option_a: "1/8",
    option_b: "3/8",
    option_c: "1/2",
    option_d: "5/8",
    correct_option: "B",
    explanation: "Number of ways = 3C2 = 3. Total outcomes = 2^3 = 8. Probability = 3/8."
  },
  {
    question: "Which of the following is an integrating factor for dy/dx + P(x)y = Q(x)?",
    option_a: "e^(integral P(x) dx)",
    option_b: "integral P(x) dx",
    option_c: "e^(-integral P(x) dx)",
    option_d: "P(x) * Q(x)",
    correct_option: "A",
    explanation: "The standard integrating factor for a linear 1st-order differential equation is e^(int P dx)."
  },
  {
    question: "What is the gradient of the scalar field f(x, y) = x^2 + 3xy at the point (1, 2)?",
    option_a: "(8, 3)",
    option_b: "(7, 3)",
    option_c: "(5, 2)",
    option_d: "(8, 6)",
    correct_option: "A",
    explanation: "grad f = (2x + 3y) i + (3x) j. At (1, 2): 2(1) + 3(2) = 8, and 3(1) = 3 -> (8, 3)."
  },
  {
    question: "If A and B are independent events with P(A) = 0.4 and P(B) = 0.5, what is P(A and B)?",
    option_a: "0.9",
    option_b: "0.2",
    option_c: "0.1",
    option_d: "0.45",
    correct_option: "B",
    explanation: "For independent events, P(A and B) = P(A) * P(B) = 0.4 * 0.5 = 0.20."
  },
  {
    question: "What is the value of i^42 where i is the imaginary unit?",
    option_a: "1",
    option_b: "-1",
    option_c: "i",
    option_d: "-i",
    correct_option: "B",
    explanation: "42 = 4*10 + 2, so i^42 = (i^4)^10 * i^2 = 1^10 * (-1) = -1."
  },
  {
    question: "What is the formula for integration by parts?",
    option_a: "int u dv = u*v - int v du",
    option_b: "int u dv = u*v + int v du",
    option_c: "int u dv = u'/v - int v'/u",
    option_d: "int u dv = (u + v) - int u v",
    correct_option: "A",
    explanation: "The product rule for differentials yields the formula: int u dv = u*v - int v du."
  },
  {
    question: "What is the trace of a square matrix?",
    option_a: "The determinant of the matrix",
    option_b: "The sum of the diagonal elements",
    option_c: "The product of the diagonal elements",
    option_d: "The difference between largest and smallest elements",
    correct_option: "B",
    explanation: "The trace of a square matrix is defined as the sum of its main diagonal elements."
  },
  {
    question: "What is the limit of (1 + 1/n)^n as n approaches infinity?",
    option_a: "1",
    option_b: "0",
    option_c: "e",
    option_d: "Infinity",
    correct_option: "C",
    explanation: "Euler's constant e is defined as lim (n->inf) (1 + 1/n)^n approx 2.71828."
  },
  {
    question: "A matrix is symmetric if:",
    option_a: "A^T = -A",
    option_b: "A^T = A",
    option_c: "A * A = I",
    option_d: "det(A) = 0",
    correct_option: "B",
    explanation: "A matrix equals its transpose (A = A^T) if and only if it is symmetric."
  },
  {
    question: "What is the derivative of sec(x)?",
    option_a: "sec(x) * tan(x)",
    option_b: "tan^2(x)",
    option_c: "-sec(x) * tan(x)",
    option_d: "sec^2(x)",
    correct_option: "A",
    explanation: "d/dx(sec x) = sec x * tan x."
  },
  {
    question: "What is the angle between the vectors (1, 0) and (0, 1)?",
    option_a: "0 degrees",
    option_b: "45 degrees",
    option_c: "90 degrees",
    option_d: "180 degrees",
    correct_option: "C",
    explanation: "Dot product is 1*0 + 0*1 = 0, which corresponds to cos(theta) = 0, so theta = 90 degrees."
  },
  {
    question: "What is the radius of convergence of the series sum of (x^n / n!) from n=0 to infinity?",
    option_a: "0",
    option_b: "1",
    option_c: "Infinity",
    option_d: "e",
    correct_option: "C",
    explanation: "The ratio test gives lim |a_{n+1}/a_n| = lim |x|/(n+1) = 0 < 1 for all x in R, so radius is infinity."
  },
  {
    question: "What is the second derivative of y = x^4 - 3x^2 + 7?",
    option_a: "4x^3 - 6x",
    option_b: "12x^2 - 6",
    option_c: "12x^2 - 6x",
    option_d: "24x",
    correct_option: "B",
    explanation: "y' = 4x^3 - 6x, y'' = 12x^2 - 6."
  },
  {
    question: "If a function is continuous on [a, b] and differentiable on (a, b) with f(a) = f(b), which theorem guarantees f'(c) = 0?",
    option_a: "Intermediate Value Theorem",
    option_b: "Rolle's Theorem",
    option_c: "Cauchy's Mean Value Theorem",
    option_d: "Green's Theorem",
    correct_option: "B",
    explanation: "Rolle's Theorem guarantees at least one point c in (a, b) where the slope f'(c) is zero."
  },
  {
    question: "What is the area bounded by the curve y = x^2 and the line y = 4 in the first quadrant?",
    option_a: "16/3",
    option_b: "8/3",
    option_c: "4",
    option_d: "32/3",
    correct_option: "A",
    explanation: "Area = int (0 to 2) (4 - x^2) dx = [4x - x^3/3] from 0 to 2 = 8 - 8/3 = 16/3."
  },
  {
    question: "What is the conjugate of the complex number z = -2 + 7i?",
    option_a: "2 - 7i",
    option_b: "-2 - 7i",
    option_c: "2 + 7i",
    option_d: "7 - 2i",
    correct_option: "B",
    explanation: "The complex conjugate of a + bi is a - bi, so -2 - 7i."
  },
  {
    question: "What is the value of 0! (zero factorial)?",
    option_a: "0",
    option_b: "1",
    option_c: "Undefined",
    option_d: "-1",
    correct_option: "B",
    explanation: "By convention and definition in combinatorics and gamma function, 0! = 1."
  },
  {
    question: "Which of the following is a unit vector in the direction of (3, 4)?",
    option_a: "(3/5, 4/5)",
    option_b: "(3/7, 4/7)",
    option_c: "(1/3, 1/4)",
    option_d: "(1, 1)",
    correct_option: "A",
    explanation: "Magnitude is sqrt(3^2 + 4^2) = 5. Dividing components gives (3/5, 4/5)."
  },
  {
    question: "The divergence of a vector field F = xi + yj + zk is:",
    option_a: "0",
    option_b: "1",
    option_c: "3",
    option_d: "x + y + z",
    correct_option: "C",
    explanation: "div F = d/dx(x) + d/dy(y) + d/dz(z) = 1 + 1 + 1 = 3."
  },
  {
    question: "What is the curl of a conservative gradient vector field grad(phi)?",
    option_a: "Always 0 (zero vector)",
    option_b: "Equal to phi",
    option_c: "Always 1",
    option_d: "Laplacian of phi",
    correct_option: "A",
    explanation: "The curl of any gradient field curl(grad phi) is identically zero."
  },
  {
    question: "In how many ways can 5 books be arranged on a shelf?",
    option_a: "24",
    option_b: "60",
    option_c: "120",
    option_d: "720",
    correct_option: "C",
    explanation: "5! = 5 * 4 * 3 * 2 * 1 = 120 ways."
  },
  {
    question: "What is the solution to dy/dx = y with y(0) = 3?",
    option_a: "y = 3 + e^x",
    option_b: "y = 3 e^x",
    option_c: "y = e^(3x)",
    option_d: "y = 3x + 3",
    correct_option: "B",
    explanation: "dy/y = dx -> ln|y| = x + C -> y = A e^x. Using y(0) = 3 gives y = 3 e^x."
  },
  {
    question: "What is the determinant of a diagonal matrix with diagonal entries 2, 3, 5?",
    option_a: "10",
    option_b: "30",
    option_c: "25",
    option_d: "15",
    correct_option: "B",
    explanation: "The determinant of a diagonal matrix is the product of its diagonal entries: 2 * 3 * 5 = 30."
  },
  {
    question: "What is the derivative of 5^x with respect to x?",
    option_a: "x * 5^(x-1)",
    option_b: "5^x",
    option_c: "5^x * ln(5)",
    option_d: "5^x / ln(5)",
    correct_option: "C",
    explanation: "d/dx (a^x) = a^x * ln(a). So 5^x * ln(5)."
  },
  {
    question: "If a line has direction cosines l, m, n, then l^2 + m^2 + n^2 equals:",
    option_a: "0",
    option_b: "1",
    option_c: "2",
    option_d: "pi",
    correct_option: "B",
    explanation: "A fundamental property of direction cosines is l^2 + m^2 + n^2 = 1."
  },
  {
    question: "What is the probability of rolling a sum of 7 with two fair 6-sided dice?",
    option_a: "1/6",
    option_b: "1/12",
    option_c: "7/36",
    option_d: "5/36",
    correct_option: "A",
    explanation: "Outcomes giving 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 pairs. 6 / 36 = 1/6."
  },
  {
    question: "What is the critical point of f(x) = x^3 - 3x ?",
    option_a: "x = 0 only",
    option_b: "x = 1 and x = -1",
    option_c: "x = 3 and x = -3",
    option_d: "No critical points",
    correct_option: "B",
    explanation: "f'(x) = 3x^2 - 3 = 0 -> 3(x^2 - 1) = 0 -> x = 1, -1."
  },
  {
    question: "Which of the following functions is neither even nor odd?",
    option_a: "cos(x)",
    option_b: "x^3",
    option_c: "e^x",
    option_d: "sin(x)",
    correct_option: "C",
    explanation: "e^(-x) is neither e^x nor -e^x, so e^x is neither even nor odd."
  },
  {
    question: "The Taylor series expansion of e^x about x = 0 begins with:",
    option_a: "1 + x + x^2/2! + x^3/3! + ...",
    option_b: "x - x^3/3! + x^5/5! - ...",
    option_c: "1 - x^2/2! + x^4/4! - ...",
    option_d: "x + x^2 + x^3 + ...",
    correct_option: "A",
    explanation: "e^x = sum (x^n / n!) = 1 + x + x^2/2 + x^3/6 + ..."
  },
  {
    question: "What is the value of int (0 to 1) of x^3 dx ?",
    option_a: "1/3",
    option_b: "1/4",
    option_c: "1/2",
    option_d: "1",
    correct_option: "B",
    explanation: "[x^4 / 4] from 0 to 1 = 1/4 - 0 = 1/4."
  },
  {
    question: "If A is an invertible matrix, then (A^-1)^T equals:",
    option_a: "(A^T)^-1",
    option_b: "A^T",
    option_c: "-A^-1",
    option_d: "A",
    correct_option: "A",
    explanation: "The transpose and inverse operations commute: (A^-1)^T = (A^T)^-1."
  },
  {
    question: "What is the domain of f(x) = sqrt(4 - x^2)?",
    option_a: "(-inf, 2]",
    option_b: "[-2, 2]",
    option_c: "[0, 2]",
    option_d: "(-2, 2)",
    correct_option: "B",
    explanation: "4 - x^2 >= 0 -> x^2 <= 4 -> -2 <= x <= 2."
  },
  {
    question: "What is the arithmetic mean of the first 5 positive integers (1, 2, 3, 4, 5)?",
    option_a: "2.5",
    option_b: "3",
    option_c: "3.5",
    option_d: "4",
    correct_option: "B",
    explanation: "(1 + 2 + 3 + 4 + 5) / 5 = 15 / 5 = 3."
  },
  {
    question: "What is the value of sinh(0)?",
    option_a: "0",
    option_b: "1",
    option_c: "-1",
    option_d: "Undefined",
    correct_option: "A",
    explanation: "sinh(x) = (e^x - e^(-x))/2. At x = 0, (1 - 1)/2 = 0."
  },
  {
    question: "Two non-singular square matrices A and B satisfy AB = BA. They are said to:",
    option_a: "Orthogonalize",
    option_b: "Commute",
    option_c: "Anti-commute",
    option_d: "Degenerate",
    correct_option: "B",
    explanation: "When matrix multiplication is commutative (AB = BA), the matrices commute."
  },
  {
    question: "What is the period of the function f(x) = sin(4x)?",
    option_a: "2 pi",
    option_b: "pi",
    option_c: "pi / 2",
    option_d: "pi / 4",
    correct_option: "C",
    explanation: "Period of sin(kx) is 2*pi / k. Here 2*pi / 4 = pi / 2."
  }
];

