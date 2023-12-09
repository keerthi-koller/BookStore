var readline = require("readline-sync");

let bookDetails = [
  { id: 101, name: "english", price: 170, status: "available", quantity: 1 },
  { id: 102, name: "kannada", price: 270, status: "available", quantity: 5 },
  { id: 103, name: "hindi", price: 270, status: "available", quantity: 1 },
  { id: 104, name: "science", price: 110, status: "available", quantity: 1 },
];
let cartDetails = [];

function bookMethod ()
{
  let opt = readline.question(
    "Choose a option : \n1.show available books to users \n2.add book \n3.show cart \n4.remove book \n5.update book \n6.exit \n"
  );

  if (opt == 1) {
    bookDetails.map((book, index) => {
      if (book.quantity == 0)
      {
        book.status = "unavailable";
      }
      if (book.status == "available")
      {
        console.log(book);
      }
    });

    bookMethod();
  } else if (opt == 2) {
    let iid = readline.question("Which book do you want to buy? \n");
    let qqty = readline.question("How much quantity you need?  \n");

        addToCart(iid, qqty);

    bookMethod();
  }
  else if (opt == 3)
  {
    let ttlSum = 0;
    console.log(cartDetails);
    cartDetails.map((book)=>{
      ttlSum += book.totalPrice;
    })
    console.log("total sum is : " + ttlSum);
    bookMethod();
  }
  else if (opt == 4)
  {
    let rid = readline.question("which book do you want to delete from the cart? \n");
    let rindex = cartDetails.findIndex(x => x.id == rid);

    let e = bookDetails.findIndex(x => x.id == rid);
    console.log(e);

    if (bookDetails.includes(x => x.rid))
    {
        console.log('hi');
        let ind = bookDetails.findIndex(x => x.id == rid);
        bookDetails[ind].quantity = bookDetails[ind].quantity + cartDetails[rindex].quantity;
    }
    else
    {
        bookDetails.push({
            id: cartDetails[rindex].id,
            name: cartDetails[rindex].name,
            price: cartDetails[rindex].price,
            status: "available",
            quantity: cartDetails[rindex].quantity,
        })
    }

    cartDetails.splice(rindex, 1);
    console.log("book removed from the cart.. \n\n");

    bookMethod();
  }
  else if (opt == 5)
  {
    let uid = readline.question("Enter which book you want to update \n")
    let uqty = readline.question("Enter updated quantity of the book \n");

    let uindx = cartDetails.findIndex(x => x.id == uid);
    let bindx = bookDetails.findIndex(x => x.id == uid);

    if (uindx >= 0)
    {
        let c = cartDetails[uindx].quantity - uqty;
        if (c > 0)
        {
            cartDetails[uindx].quantity = cartDetails[uindx].quantity - c;
            bookDetails[bindx].quantity = bookDetails[bindx].quantity + c;
        }
        else
        {
            console.log(-c);
            if (-c > bookDetails[bindx].quantity)
            {
                console.log("Unavailable!!! \n");
            }
            else
            {
                cartDetails[uindx].quantity = cartDetails[uindx].quantity + (-c);
                bookDetails[bindx].quantity = bookDetails[bindx].quantity - (-c);
            }
        }
    }
    else
    {
        console.log("No items found in the cart of this id number");
    }

    bookMethod();
  }
  else if (opt == 6)
  {
    console.log('Thank you!');
    return;
  }
  else{
    console.log('Enter valid number');
    bookMethod();
  }
}

bookMethod();



function addToCart (iid, qqty)
{
    let index = bookDetails.findIndex(x => x.id == Number(iid));

    if (Number(qqty) <= Number(bookDetails[index].quantity))
    {
      if (bookDetails[index].quantity == 0)
      {
        bookDetails[index].status = "unavailable";
      }
      if (bookDetails[index].status == "unavailable")
      {
        console.log('Book is not available');
      }
      else
      {
        cartDetails.push({
        id: bookDetails[index].id,
        name: bookDetails[index].name,
        price: bookDetails[index].price,
        quantity: qqty,
        totalPrice: qqty * bookDetails[index].price,
        });

        bookDetails[index].quantity = bookDetails[index].quantity-qqty;
        console.log(`${bookDetails[index].name} book is added to the cart`);
      }
    }
    else
    {
        let qqty1 = readline.question("this much quantity is not available, please re-enter the quantity \n\n");
        addToCart(iid, qqty1)
    }
}