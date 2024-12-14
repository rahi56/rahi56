n=int(input())
a=list(map(int,input().split()))
b=0;
x=1
for i in reversed(a):
   l=i%10
   b+=l*x
   x*=10
if b%10==0:
  print("Yes")
else:
  print("No")