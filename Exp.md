Función Matemática General del Generador Cuadrático Congruencial:
La fórmula que describe el Generador Cuadrático Congruencial es una variante de los generadores congruenciales lineales, que introduce un término cuadrático en la semilla. Esta fórmula general se puede expresar como:
 ![image](https://github.com/user-attachments/assets/0e58ab3a-f5c8-4f43-97f6-14ebaa510d1e)

Descripción de los términos:
•	Xn : Es el valor actual (la semilla) en la iteración nnn, que se actualiza en cada paso.
•	a: Es una constante multiplicativa.
•	b: Es una constante asociada al término cuadrático.
•	c: Es una constante aditiva.
•	m: Es el módulo que define el rango en el que los números generados se encuentran.
•	Xn+1: Es el siguiente valor generado, que se usa como la nueva semilla para la siguiente iteración.
Explicación paso a paso:
1.	Valor inicial: Se define un valor inicial para la semilla, X0, que puede ser cualquier valor entero dentro de un rango determinado.
2.	Cálculo del siguiente valor: En cada paso n, se calcula Xn+1 usando la fórmula anterior. Este cálculo involucra una combinación lineal y cuadrática de la semilla actual Xn.
3.	Reducción modular: Después de aplicar los términos de la fórmula (multiplicativos, aditivos, y cuadráticos), el resultado se reduce usando el módulo m. Esto asegura que el número generado esté dentro de un rango limitado (normalmente entre 0 y m−1).
4.	Repetición: El valor Xn+1 se convierte en la nueva semilla, y el proceso se repite para obtener una secuencia de números pseudoaleatorios.


Os.urandom
El método os.urandom() no se basa en una función matemática como los generadores congruenciales o cuadráticos. En su lugar, genera números aleatorios utilizando una fuente de entropía del sistema operativo, lo que hace que sea más adecuado para aplicaciones criptográficas.
¿Cómo representar os.urandom() en una función matemática?
En realidad, os.urandom() no tiene una representación directa en una función matemática, porque no utiliza un algoritmo determinista como los generadores de números pseudoaleatorios (PRNG). El propósito de os.urandom es generar datos verdaderamente aleatorios a partir de una fuente externa (entropía del sistema operativo). Esta fuente de entropía puede ser cosas como el ruido de hardware, movimientos del ratón, la latencia en las redes, u otros eventos no predecibles.
¿Cómo podrías interpretar este proceso en términos matemáticos?
Aunque no es una función matemática en el sentido tradicional, podemos describir os.urandom() como una función no determinista que devuelve un valor aleatorio basado en la entropía del entorno del sistema:
 ![image](https://github.com/user-attachments/assets/1ed8a73b-ff3b-4676-ba56-a70a3d0443b2)

Donde:
•	F es la función que depende del "entorno" o las condiciones físicas del sistema operativo (incluyendo el ruido térmico, tiempos de eventos, etc.).
•	Entorno es una colección de eventos impredecibles, como el ruido de hardware o la interacción humana.
•	bytes aleatorios son los datos aleatorios generados.
Diferencia clave con una función matemática tradicional:
•	Impredecibilidad: A diferencia de un PRNG que tiene una semilla inicial y una fórmula matemática clara para generar números, os.urandom() extrae su impredecibilidad de una fuente física. No es posible formular una ecuación matemática para predecir su salida porque depende de fuentes externas y caóticas.
•	Ausencia de iteración determinista: No hay una relación como Xn+1=f(Xn), porque no hay un Xn(estado anterior) que esté relacionado con el siguiente valor generado. Cada llamada a os.urandom() es independiente y no depende de un valor previo.
En resumen, os.urandom() no se representa mediante una función matemática clásica porque no utiliza un algoritmo basado en fórmulas deterministas. En lugar de ello, es un proceso que depende del sistema operativo y su recolección de entropía, lo que lo convierte en un método adecuado para generar números verdaderamente aleatorios para aplicaciones criptográficas.


