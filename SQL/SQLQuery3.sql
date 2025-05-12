create database f_project 

use f_project

select * from [Final-project by Excel]

--CLEANING 

--Check Nulls
SELECT COUNT(*) AS NO_of_Nulls
FROM [Final-project by Excel]
WHERE Customer_ID IS NULL OR Order_ID IS NULL ;

--Duplicates	
SELECT Order_ID, Customer_ID, Product_ID ,sales,sub_category,COUNT(*) AS DuplicateCount
FROM [Final-project by Excel]
GROUP BY Order_ID, Customer_ID, Product_ID,Sales,sub_category
HAVING COUNT(*) > 1;

select * from [Final-project by Excel]
where order_id = 'US-2015-150119' AND Customer_id = 'LB-16795' AND sub_category ='chairs'

select * from [Final-project by Excel]
where order_id = 'US-2017-123750' AND Customer_id = 'RB-19795' AND sub_category ='Accessories'

---Negative Sales (same error)
SELECT *
FROM [Final-project by Excel]
WHERE sales < 0 ;


select * from [Final-project by Excel]

--Sales Analysis 
--What are the total sales by Region, State, and City?
SELECT city , state , Region , sum(sales) AS Total_Sales
from [Final-project by Excel] 
group by city , state , Region
order by Total_Sales desc

--Which product is top-performing?
SELECT TOP 1 product_name, COUNT(product_id) AS top_product
FROM [Final-project by Excel]
GROUP BY product_name
ORDER BY top_product DESC;

--Which sub_category is top-performing?
SELECT TOP 1 sub_category , COUNT(sub_category) AS top_SubCategory
FROM [Final-project by Excel]
GROUP BY sub_category
ORDER BY top_SubCategory DESC;

--Which category is top-performing?
SELECT TOP 1 category , COUNT(category) AS top_Category
FROM [Final-project by Excel]
GROUP BY category
ORDER BY top_Category DESC;

--What is the Average value per Order ?
SELECT order_id, Round(avg(sales),2) AS AvgValuePerOrder
FROM [Final-project by Excel]
group by order_id
order by order_id

--What are the seasonal sales patterns (Season of Order)? Which seasons have the highest and lowest sales?
Select season_of_order , round(sum(sales),2) AS Total_Sales
from [Final-project by Excel]
group by season_of_order
order by Total_Sales DESC ;

--Which days of the week (Order Day Name) have the most sales activity?
Select Order_Day_Name , count(Order_ID) AS Order_per_Day
from [Final-project by Excel]
group by Order_Day_Name
order by Order_per_Day DESC

select * from [Final-project by Excel]

--How does sales performance differ between different Sales Categories (Low, Medium, High)?
select Sales_Category , count(Order_ID) AS Order_per_SalesPerformance
from [Final-project by Excel]
group by Sales_Category
order by Order_per_SalesPerformance DESC

--What are the purchasing patterns of each customer segment?
select Segment , Order_Month_Name , count(order_id) AS Total_Orders 
from [Final-project by Excel]
group by Segment , Order_Month_Name
order by Total_Orders DESC

--What is the average Order Frequency per customer segment? >>>>>>>>>>>>>note 
select Segment ,avg(Order_Frequency)  AS Total_Orders 
from [Final-project by Excel]
group by Segment 

--Which customer segment contributes the most to total revenue?
Select segment , round(sum(sales),2) AS Toatl_by_Segment
from [Final-project by Excel]
group by segment 
order by Toatl_by_Segment 

select * from [Final-project by Excel]

--Who are 10 top high-value customers based on total sales?
select top 10 Customer_Name , round(sum(sales),2) AS TotalSales
from [Final-project by Excel]
group by Customer_Name
order by TotalSales DESC

--Which products are the best-selling and least-selling?
select top 1 Product_Name , round(sum(sales),2) AS TotalSales
from [Final-project by Excel]
group by Product_Name
order by TotalSales DESC

--Least Selling 
select top 1 Product_Name , round(sum(sales),2) AS TotalSales
from [Final-project by Excel]
group by Product_Name
Having round(sum(sales),2) > 0
order by TotalSales 

--What are the sales distribution and patterns across different Product Names?
select Ship_Mode , count(Product_Name) AS No_of_Products
from [Final-project by Excel]
group by Ship_Mode 
order by No_of_Products DESC

-- Total Categories and sub-categories per state ?
select State , COUNT(category) AS Total_Categories , count(Sub_Category) Total_subcategories
from [Final-project by Excel]
group by State
order by Total_Categories DESC 

--What is the average Order to Ship Duration across different Shipping Modes?
select Ship_Mode , avg(Order_to_ship_Duration) AS Order_to_ship_Duration
from [Final-project by Excel]
group by Ship_Mode
order by Order_to_ship_Duration DESC 

--Which the fastest State prepare orders ?
SELECT state ,AVG(DATEDIFF(DAY, Order_Date, Ship_Date)) AS Avg_Order_to_Ship_Duration
FROM [Final-project by Excel]
GROUP BY state
ORDER BY Avg_Order_to_Ship_Duration ASC;