import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ShoppingBag, Home } from "lucide-react"

export default function ConfirmationPage() {
  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Card className="border-2 border-primary/20">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">Thank you for your purchase. Your order has been successfully placed.</p>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Order Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-left text-muted-foreground">Order Number:</div>
              <div className="text-right font-medium">MS-{Math.floor(100000 + Math.random() * 900000)}</div>

              <div className="text-left text-muted-foreground">Date:</div>
              <div className="text-right">{new Date().toLocaleDateString()}</div>

              <div className="text-left text-muted-foreground">Payment Method:</div>
              <div className="text-right">PayPal (Test Mode)</div>

              <div className="text-left text-muted-foreground">Shipping:</div>
              <div className="text-right">Standard Shipping (3-5 business days)</div>
            </div>
          </div>

          <div className="border border-dashed border-muted-foreground/20 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent with your order details and tracking information.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

