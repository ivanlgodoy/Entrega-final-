import match
import turtle 
turtle.bgcolor ("black")
turtle.pencolor("blac")
turtle.shape("triangle")
turtle.speed("0")
turtle.fillcolor("orangered")
phi= 137.508*(match.pi / 180.0)
for i in range (180+40):
    r= 4* match.sqrt(i)
    theta= i * phi
    x= r * match.cos (theta)
    y = r * match.sin(theta)
    turtle.penup()
    turtle.goto(x,y)
    turtle.setheading(i *137.508)
    turtle.pendow()
    if i < 160:
        turtle.stamp ()
    else : 
        turtle.fillcolor("yellow")
        turtle.begin_fill()
        turtle left(-5)
        turtle.circle(500,15)
        turtle.rigth(-155)
        turtle.circle(500,25)
        turtle.end_fill()
turtle.hideturtle()
turtle.done()
