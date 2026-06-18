-- ============================================================
-- STAFFFLOW SEED — 12 clients, 200 candidates, 20 jobs
-- Paste this entire script into the Supabase SQL Editor and Run
-- ============================================================

-- Clear existing data
DELETE FROM staffflow.timesheets WHERE agency_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM staffflow.placements WHERE agency_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM staffflow.jobs WHERE agency_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM staffflow.candidates WHERE agency_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM staffflow.clients WHERE agency_id = '00000000-0000-0000-0000-000000000001';

-- 12 Clients
INSERT INTO staffflow.clients (agency_id,company_name,contact_name,email,phone,city,industry) VALUES
('00000000-0000-0000-0000-000000000001','TruckPro Logistics','Raj Sharma','raj@truckpro.ca','+1-905-555-0101','Brampton, ON','Transport'),
('00000000-0000-0000-0000-000000000001','BuildCore Inc.','Tom Whitfield','tom@buildcore.ca','+1-416-555-0102','Scarborough, ON','Construction'),
('00000000-0000-0000-0000-000000000001','Maple Warehousing','Linda Chow','linda@maplewh.ca','+1-905-555-0103','Mississauga, ON','Logistics'),
('00000000-0000-0000-0000-000000000001','FastFreight GTA','Priya Nair','priya@fastfreight.ca','+1-416-555-0104','Etobicoke, ON','Transport'),
('00000000-0000-0000-0000-000000000001','SteelTech Mfg.','James O''Brien','james@steeltech.ca','+1-905-555-0105','Oshawa, ON','Manufacturing'),
('00000000-0000-0000-0000-000000000001','AeroLogix Inc.','Sandra Patel','sandra@aerologix.ca','+1-905-555-0106','Brampton, ON','Logistics'),
('00000000-0000-0000-0000-000000000001','Ontario Cold Storage','Derek Maas','derek@ontariocold.ca','+1-905-555-0107','Mississauga, ON','Warehousing'),
('00000000-0000-0000-0000-000000000001','Metro Transit Works','Angela Yu','angela@metrotransit.ca','+1-416-555-0108','Toronto, ON','Transport'),
('00000000-0000-0000-0000-000000000001','Pinnacle Packaging','Mike Kowalski','mike@pinnaclepkg.ca','+1-905-555-0109','Brampton, ON','Manufacturing'),
('00000000-0000-0000-0000-000000000001','GreenLeaf Distribution','Fatima Hassan','fatima@greenleaf.ca','+1-905-555-0110','Mississauga, ON','Logistics'),
('00000000-0000-0000-0000-000000000001','Ridgeline Construction','Chris Dubois','chris@ridgeline.ca','+1-416-555-0111','Scarborough, ON','Construction'),
('00000000-0000-0000-0000-000000000001','Nexus Auto Parts','Harpreet Gill','harpreet@nexusauto.ca','+1-905-555-0112','Brampton, ON','Manufacturing');

-- 200 Candidates
INSERT INTO staffflow.candidates (agency_id,full_name,role,license_class,city,phone,email,status,rating,skills,criminal_check,cvos_abstract,whmis_cert,reference_verified,drug_test) VALUES
('00000000-0000-0000-0000-000000000001','Amarjit Kaur','Forklift Operator','Forklift Cert.','Scarborough, ON','+1-905-555-1000','amarjit.kaur@email.com','Screened',4.6,ARRAY['Reach Truck','Inventory','Order Picking'],false,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Mohit Lopez','AZ Driver','AZ','Toronto, ON','+1-416-555-1001','mohit.lopez@email.com','Screened',4.5,ARRAY['City Driving','Log Books','Highway Transport'],false,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Paramjit Ahmed','Warehouse Associate',NULL,'Scarborough, ON','+1-416-555-1002','paramjit.ahmed@email.com','Applied',4.8,ARRAY['Pick Pack','RF Scanner','Inventory Count'],false,true,false,false,false),
('00000000-0000-0000-0000-000000000001','Jose Brar','General Labour',NULL,'Scarborough, ON','+1-905-555-1003','jose.brar@email.com','Placed',4.6,ARRAY['Lifting 50lbs','Steel-toed Boots','Flagging'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Anthony Dhaliwal','General Labour',NULL,'Scarborough, ON','+1-416-555-1004','anthony.dhaliwal@email.com','Shortlisted',4.1,ARRAY['Steel-toed Boots','Site Cleanup','Flagging'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Michael Lee','Forklift Operator','Forklift Cert.','Mississauga, ON','+1-647-555-1005','michael.lee@email.com','Applied',4.6,ARRAY['RF Scanner','Inventory','Reach Truck'],true,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Wei Diallo','DZ Driver','DZ','Brampton, ON','+1-647-555-1006','wei.diallo@email.com','Screened',4.4,ARRAY['Hand Truck','Customer Service','City Delivery'],false,false,true,true,false),
('00000000-0000-0000-0000-000000000001','Adebayo Tiwari','General Labour',NULL,'Etobicoke, ON','+1-905-555-1007','adebayo.tiwari@email.com','Offered',4.4,ARRAY['Flagging','Steel-toed Boots','Material Handling'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Stefan Lopez','AZ Driver','AZ','Etobicoke, ON','+1-416-555-1008','stefan.lopez@email.com','Background Check',5.0,ARRAY['City Driving','Log Books','TDG'],false,true,false,false,false),
('00000000-0000-0000-0000-000000000001','Segun Nair','Forklift Operator','Forklift Cert.','Scarborough, ON','+1-416-555-1009','segun.nair@email.com','Applied',3.8,ARRAY['Order Picking','RF Scanner','Counterbalance'],false,false,false,false,true),
('00000000-0000-0000-0000-000000000001','Kulwinder Popescu','DZ Driver','DZ','Oshawa, ON','+1-416-555-1010','kulwinder.popescu@email.com','Interview',4.7,ARRAY['Hand Truck','Route Planning','City Delivery'],false,false,false,true,true),
('00000000-0000-0000-0000-000000000001','Marcus Mendez','Industrial Worker',NULL,'Scarborough, ON','+1-905-555-1011','marcus.mendez@email.com','Placed',4.9,ARRAY['Machine Operation','WHMIS','Assembly Line'],false,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Simran Gill','Forklift Operator','Forklift Cert.','Etobicoke, ON','+1-647-555-1012','simran.gill@email.com','Interview',4.3,ARRAY['Reach Truck','Order Picking','RF Scanner'],true,false,false,true,true),
('00000000-0000-0000-0000-000000000001','Pedro Wang','Industrial Worker',NULL,'Toronto, ON','+1-905-555-1013','pedro.wang@email.com','Shortlisted',4.2,ARRAY['Assembly Line','WHMIS','Blueprint Reading'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Carlos Ali','AZ Driver','AZ','Brampton, ON','+1-647-555-1014','carlos.ali@email.com','Background Check',4.4,ARRAY['Highway Transport','Shunting','Log Books'],false,false,false,false,true),
('00000000-0000-0000-0000-000000000001','Deepak Iyer','General Labour',NULL,'Mississauga, ON','+1-416-555-1015','deepak.iyer@email.com','Applied',4.3,ARRAY['Material Handling','Flagging','Site Cleanup'],false,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Carlos Diallo','Forklift Operator','Forklift Cert.','Scarborough, ON','+1-905-555-1016','carlos.diallo@email.com','Placed',4.4,ARRAY['Counterbalance','Reach Truck','Inventory'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Navdeep Adeyemi','Forklift Operator','Forklift Cert.','Toronto, ON','+1-416-555-1017','navdeep.adeyemi@email.com','Applied',4.4,ARRAY['Counterbalance','Reach Truck','Inventory'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Adebayo Pillai','Warehouse Associate',NULL,'Etobicoke, ON','+1-905-555-1018','adebayo.pillai@email.com','Screened',4.2,ARRAY['RF Scanner','Inventory Count','Pick Pack'],false,true,false,false,false),
('00000000-0000-0000-0000-000000000001','Carlos Adeyemi','General Labour',NULL,'Etobicoke, ON','+1-647-555-1019','carlos.adeyemi@email.com','Interview',3.9,ARRAY['Lifting 50lbs','Site Cleanup','Material Handling'],true,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Diljit Martinez','DZ Driver','DZ','Toronto, ON','+1-647-555-1020','diljit.martinez@email.com','Offered',4.5,ARRAY['City Delivery','Hand Truck','Route Planning'],true,false,true,true,true),
('00000000-0000-0000-0000-000000000001','Luis Gill','Forklift Operator','Forklift Cert.','Oshawa, ON','+1-905-555-1021','luis.gill@email.com','Screened',4.3,ARRAY['RF Scanner','Order Picking','Counterbalance'],false,false,true,true,true),
('00000000-0000-0000-0000-000000000001','Ming Hassan','Industrial Worker',NULL,'Mississauga, ON','+1-647-555-1022','ming.hassan@email.com','Background Check',4.6,ARRAY['Machine Operation','WHMIS','Quality Control'],false,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Ibrahim Constantin','AZ Driver','AZ','Mississauga, ON','+1-647-555-1023','ibrahim.constantin@email.com','Screened',4.0,ARRAY['Highway Transport','City Driving','TDG'],true,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Mohit Liu','DZ Driver','DZ','Brampton, ON','+1-905-555-1024','mohit.liu@email.com','Applied',4.2,ARRAY['Liftgate','Customer Service','City Delivery'],true,false,true,true,false),
('00000000-0000-0000-0000-000000000001','Parminder Mendez','AZ Driver','AZ','Oshawa, ON','+1-647-555-1025','parminder.mendez@email.com','Applied',4.5,ARRAY['City Driving','Highway Transport','Shunting'],true,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Harjit Nwosu','DZ Driver','DZ','Oshawa, ON','+1-416-555-1026','harjit.nwosu@email.com','Screened',5.0,ARRAY['City Delivery','Customer Service','Liftgate'],false,false,true,true,false),
('00000000-0000-0000-0000-000000000001','David Toure','AZ Driver','AZ','Mississauga, ON','+1-647-555-1027','david.toure@email.com','Placed',4.8,ARRAY['TDG','Log Books','City Driving'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Christopher Khan','Warehouse Associate',NULL,'Etobicoke, ON','+1-905-555-1028','christopher.khan@email.com','Background Check',4.6,ARRAY['Receiving','Shipping','Pick Pack'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Ming Ionescu','General Labour',NULL,'Etobicoke, ON','+1-905-555-1029','ming.ionescu@email.com','Placed',4.9,ARRAY['Lifting 50lbs','Steel-toed Boots','Material Handling'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Bogdan Nwosu','Forklift Operator','Forklift Cert.','Scarborough, ON','+1-647-555-1030','bogdan.nwosu@email.com','Background Check',4.0,ARRAY['Inventory','Counterbalance','Reach Truck'],true,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Kevin Mensah','General Labour',NULL,'Brampton, ON','+1-905-555-1031','kevin.mensah@email.com','Placed',4.7,ARRAY['Steel-toed Boots','Lifting 50lbs','Flagging'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Amadou Rodriguez','AZ Driver','AZ','Mississauga, ON','+1-647-555-1032','amadou.rodriguez@email.com','Background Check',4.2,ARRAY['Log Books','Shunting','TDG'],false,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Jian Li','General Labour',NULL,'Etobicoke, ON','+1-905-555-1033','jian.li@email.com','Placed',4.6,ARRAY['Site Cleanup','Flagging','Steel-toed Boots'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Emmanuel Verma','DZ Driver','DZ','Mississauga, ON','+1-905-555-1034','emmanuel.verma@email.com','Placed',4.1,ARRAY['Route Planning','Hand Truck','City Delivery'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','John Mishra','Forklift Operator','Forklift Cert.','Etobicoke, ON','+1-647-555-1035','john.mishra@email.com','Shortlisted',4.6,ARRAY['RF Scanner','Reach Truck','Counterbalance'],false,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Sanjay Adeyemi','General Labour',NULL,'Mississauga, ON','+1-647-555-1036','sanjay.adeyemi@email.com','Applied',4.4,ARRAY['Flagging','Site Cleanup','Lifting 50lbs'],false,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Mohit Zhang','Warehouse Associate',NULL,'Toronto, ON','+1-416-555-1037','mohit.zhang@email.com','Shortlisted',4.7,ARRAY['Shipping','RF Scanner','Inventory Count'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Emmanuel Davis','General Labour',NULL,'Brampton, ON','+1-416-555-1038','emmanuel.davis@email.com','Placed',4.2,ARRAY['Steel-toed Boots','Site Cleanup','Flagging'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Daniel Hassan','General Labour',NULL,'Etobicoke, ON','+1-905-555-1039','daniel.hassan@email.com','Background Check',4.0,ARRAY['Lifting 50lbs','Flagging','Site Cleanup'],true,true,false,false,false),
('00000000-0000-0000-0000-000000000001','Jose Chen','AZ Driver','AZ','Scarborough, ON','+1-647-555-1040','jose.chen@email.com','Screened',4.7,ARRAY['Log Books','City Driving','TDG'],false,false,true,true,true),
('00000000-0000-0000-0000-000000000001','Miguel Eze','Forklift Operator','Forklift Cert.','Oshawa, ON','+1-905-555-1041','miguel.eze@email.com','Placed',5.0,ARRAY['RF Scanner','Reach Truck','Inventory'],true,false,true,true,true),
('00000000-0000-0000-0000-000000000001','Stefan Gill','Warehouse Associate',NULL,'Etobicoke, ON','+1-416-555-1042','stefan.gill@email.com','Applied',4.1,ARRAY['Pick Pack','Receiving','Shipping'],true,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Pavel Brown','Warehouse Associate',NULL,'Brampton, ON','+1-905-555-1043','pavel.brown@email.com','Shortlisted',4.6,ARRAY['Pick Pack','Inventory Count','Shipping'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Kevin Rao','AZ Driver','AZ','Toronto, ON','+1-647-555-1044','kevin.rao@email.com','Applied',3.9,ARRAY['Shunting','City Driving','Log Books'],false,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Amarjit Nair','Warehouse Associate',NULL,'Mississauga, ON','+1-647-555-1045','amarjit.nair@email.com','Screened',4.6,ARRAY['Pick Pack','Inventory Count','Shipping'],false,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Chukwuemeka Dhaliwal','Forklift Operator','Forklift Cert.','Scarborough, ON','+1-905-555-1046','chukwuemeka.dhaliwal@email.com','Placed',4.2,ARRAY['Inventory','Counterbalance','Order Picking'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Suresh Dhaliwal','General Labour',NULL,'Scarborough, ON','+1-905-555-1047','suresh.dhaliwal@email.com','Placed',4.7,ARRAY['Flagging','Site Cleanup','Lifting 50lbs'],false,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Anil Li','General Labour',NULL,'Oshawa, ON','+1-905-555-1048','anil.li@email.com','Offered',4.1,ARRAY['Steel-toed Boots','Lifting 50lbs','Material Handling'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Xiao Kaur','General Labour',NULL,'Scarborough, ON','+1-416-555-1049','xiao.kaur@email.com','Applied',4.2,ARRAY['Flagging','Site Cleanup','Lifting 50lbs'],false,true,false,true,true),
('00000000-0000-0000-0000-000000000001','John Brar','DZ Driver','DZ','Oshawa, ON','+1-416-555-1050','john.brar@email.com','Background Check',4.6,ARRAY['Liftgate','Route Planning','Customer Service'],true,false,true,true,false),
('00000000-0000-0000-0000-000000000001','Mohammed Constantin','General Labour',NULL,'Scarborough, ON','+1-647-555-1051','mohammed.constantin@email.com','Shortlisted',4.5,ARRAY['Lifting 50lbs','Steel-toed Boots','Site Cleanup'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','John Okonkwo','AZ Driver','AZ','Oshawa, ON','+1-647-555-1052','john.okonkwo@email.com','Interview',4.4,ARRAY['Shunting','City Driving','Highway Transport'],false,false,false,true,true),
('00000000-0000-0000-0000-000000000001','John Miller','DZ Driver','DZ','Scarborough, ON','+1-647-555-1053','john.miller@email.com','Applied',4.0,ARRAY['Customer Service','City Delivery','Hand Truck'],true,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Parminder Martinez','DZ Driver','DZ','Etobicoke, ON','+1-905-555-1054','parminder.martinez@email.com','Shortlisted',4.1,ARRAY['Liftgate','Customer Service','City Delivery'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Raj Sharma','AZ Driver','AZ','Toronto, ON','+1-647-555-1055','raj.sharma@email.com','Screened',4.7,ARRAY['Highway Transport','Shunting','City Driving'],false,false,true,false,true),
('00000000-0000-0000-0000-000000000001','Ravi Wilson','Warehouse Associate',NULL,'Toronto, ON','+1-647-555-1056','ravi.wilson@email.com','Background Check',3.9,ARRAY['Receiving','Pick Pack','Inventory Count'],false,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Emmanuel Patel','General Labour',NULL,'Brampton, ON','+1-647-555-1057','emmanuel.patel@email.com','Applied',4.5,ARRAY['Material Handling','Flagging','Site Cleanup'],true,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Vikram Hassan','Forklift Operator','Forklift Cert.','Mississauga, ON','+1-905-555-1058','vikram.hassan@email.com','Screened',4.5,ARRAY['Inventory','Reach Truck','RF Scanner'],false,false,false,true,true),
('00000000-0000-0000-0000-000000000001','Mohammed Lopez','Forklift Operator','Forklift Cert.','Toronto, ON','+1-647-555-1059','mohammed.lopez@email.com','Screened',4.2,ARRAY['RF Scanner','Counterbalance','Reach Truck'],true,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Bogdan Tiwari','DZ Driver','DZ','Toronto, ON','+1-647-555-1060','bogdan.tiwari@email.com','Screened',4.8,ARRAY['City Delivery','Hand Truck','Liftgate'],false,false,false,false,true),
('00000000-0000-0000-0000-000000000001','Harjit Joshi','Warehouse Associate',NULL,'Mississauga, ON','+1-905-555-1061','harjit.joshi@email.com','Shortlisted',5.0,ARRAY['Inventory Count','RF Scanner','Shipping'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Mihai Eze','DZ Driver','DZ','Oshawa, ON','+1-647-555-1062','mihai.eze@email.com','Applied',4.4,ARRAY['Route Planning','Customer Service','Hand Truck'],false,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Olumide Okonkwo','AZ Driver','AZ','Etobicoke, ON','+1-905-555-1063','olumide.okonkwo@email.com','Interview',4.0,ARRAY['Highway Transport','Log Books','Shunting'],true,false,false,false,true),
('00000000-0000-0000-0000-000000000001','Simran Miller','General Labour',NULL,'Oshawa, ON','+1-647-555-1064','simran.miller@email.com','Shortlisted',4.8,ARRAY['Material Handling','Lifting 50lbs','Steel-toed Boots'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Christopher Rao','Industrial Worker',NULL,'Brampton, ON','+1-647-555-1065','christopher.rao@email.com','Shortlisted',4.2,ARRAY['Assembly Line','WHMIS','Quality Control'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Vikram Rodriguez','AZ Driver','AZ','Etobicoke, ON','+1-416-555-1066','vikram.rodriguez@email.com','Screened',4.7,ARRAY['City Driving','Shunting','Highway Transport'],false,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Ibrahim Rao','General Labour',NULL,'Toronto, ON','+1-647-555-1067','ibrahim.rao@email.com','Placed',4.4,ARRAY['Flagging','Site Cleanup','Lifting 50lbs'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','John Gupta','DZ Driver','DZ','Toronto, ON','+1-416-555-1068','john.gupta@email.com','Background Check',4.7,ARRAY['Route Planning','Liftgate','City Delivery'],false,false,true,false,false),
('00000000-0000-0000-0000-000000000001','Paramjit Liu','AZ Driver','AZ','Mississauga, ON','+1-416-555-1069','paramjit.liu@email.com','Interview',3.9,ARRAY['City Driving','TDG','Highway Transport'],false,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Mandeep Chen','Warehouse Associate',NULL,'Scarborough, ON','+1-905-555-1070','mandeep.chen@email.com','Background Check',4.8,ARRAY['Inventory Count','RF Scanner','Receiving'],false,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Suresh Lee','AZ Driver','AZ','Toronto, ON','+1-647-555-1071','suresh.lee@email.com','Applied',3.9,ARRAY['Shunting','TDG','Highway Transport'],false,false,false,true,true),
('00000000-0000-0000-0000-000000000001','Ibrahim Kaur','AZ Driver','AZ','Scarborough, ON','+1-416-555-1072','ibrahim.kaur@email.com','Placed',4.3,ARRAY['Highway Transport','TDG','Shunting'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Jose Hernandez','Forklift Operator','Forklift Cert.','Mississauga, ON','+1-416-555-1073','jose.hernandez@email.com','Shortlisted',4.6,ARRAY['Inventory','Reach Truck','Counterbalance'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','James Hassan','General Labour',NULL,'Scarborough, ON','+1-416-555-1074','james.hassan@email.com','Offered',4.3,ARRAY['Steel-toed Boots','Flagging','Lifting 50lbs'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Jose Martinez','DZ Driver','DZ','Toronto, ON','+1-416-555-1075','jose.martinez@email.com','Screened',4.1,ARRAY['Customer Service','City Delivery','Hand Truck'],false,false,false,true,false),
('00000000-0000-0000-0000-000000000001','Ramesh Rao','Industrial Worker',NULL,'Scarborough, ON','+1-647-555-1076','ramesh.rao@email.com','Placed',4.0,ARRAY['WHMIS','Machine Operation','Assembly Line'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Navneet Popescu','AZ Driver','AZ','Oshawa, ON','+1-905-555-1077','navneet.popescu@email.com','Placed',4.5,ARRAY['Highway Transport','TDG','Shunting'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Simran Pillai','General Labour',NULL,'Scarborough, ON','+1-416-555-1078','simran.pillai@email.com','Interview',4.9,ARRAY['Lifting 50lbs','Steel-toed Boots','Material Handling'],false,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Amarjit Li','AZ Driver','AZ','Mississauga, ON','+1-416-555-1079','amarjit.li@email.com','Placed',3.9,ARRAY['Shunting','Log Books','TDG'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Adebayo Garcia','General Labour',NULL,'Oshawa, ON','+1-905-555-1080','adebayo.garcia@email.com','Background Check',4.5,ARRAY['Material Handling','Site Cleanup','Flagging'],false,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Sanjay Gupta','DZ Driver','DZ','Oshawa, ON','+1-905-555-1081','sanjay.gupta@email.com','Background Check',4.2,ARRAY['City Delivery','Route Planning','Hand Truck'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Pavel Garcia','Forklift Operator','Forklift Cert.','Oshawa, ON','+1-647-555-1082','pavel.garcia@email.com','Applied',4.3,ARRAY['RF Scanner','Counterbalance','Reach Truck'],false,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Sung Dhaliwal','Forklift Operator','Forklift Cert.','Scarborough, ON','+1-416-555-1083','sung.dhaliwal@email.com','Interview',4.0,ARRAY['Order Picking','Counterbalance','Reach Truck'],true,false,true,false,false),
('00000000-0000-0000-0000-000000000001','Marcus Adeyemi','Warehouse Associate',NULL,'Scarborough, ON','+1-647-555-1084','marcus.adeyemi@email.com','Screened',4.0,ARRAY['Shipping','Inventory Count','Pick Pack'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Gurpreet Davis','Warehouse Associate',NULL,'Mississauga, ON','+1-905-555-1085','gurpreet.davis@email.com','Applied',4.6,ARRAY['Inventory Count','Receiving','Pick Pack'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Jian Kaur','AZ Driver','AZ','Scarborough, ON','+1-905-555-1086','jian.kaur@email.com','Applied',4.7,ARRAY['Shunting','Log Books','TDG'],true,false,true,true,true),
('00000000-0000-0000-0000-000000000001','Harjit Yadav','Warehouse Associate',NULL,'Oshawa, ON','+1-905-555-1087','harjit.yadav@email.com','Interview',3.9,ARRAY['Receiving','RF Scanner','Inventory Count'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Ravi Hassan','Industrial Worker',NULL,'Brampton, ON','+1-905-555-1088','ravi.hassan@email.com','Background Check',4.1,ARRAY['Blueprint Reading','WHMIS','Assembly Line'],false,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Amadou Li','General Labour',NULL,'Toronto, ON','+1-647-555-1089','amadou.li@email.com','Background Check',4.9,ARRAY['Material Handling','Lifting 50lbs','Steel-toed Boots'],false,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Vikram Diallo','General Labour',NULL,'Oshawa, ON','+1-647-555-1090','vikram.diallo@email.com','Applied',4.1,ARRAY['Steel-toed Boots','Flagging','Site Cleanup'],false,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Sukhwinder Brar','General Labour',NULL,'Brampton, ON','+1-905-555-1091','sukhwinder.brar@email.com','Placed',4.5,ARRAY['Steel-toed Boots','Site Cleanup','Lifting 50lbs'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Stefan Yadav','AZ Driver','AZ','Scarborough, ON','+1-647-555-1092','stefan.yadav@email.com','Offered',4.4,ARRAY['TDG','City Driving','Highway Transport'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Amarjit Joshi','DZ Driver','DZ','Toronto, ON','+1-647-555-1093','amarjit.joshi@email.com','Screened',4.8,ARRAY['Liftgate','City Delivery','Customer Service'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Gurpreet Patel','Warehouse Associate',NULL,'Mississauga, ON','+1-647-555-1094','gurpreet.patel@email.com','Offered',4.6,ARRAY['RF Scanner','Pick Pack','Inventory Count'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Xiao Kumar','DZ Driver','DZ','Scarborough, ON','+1-905-555-1095','xiao.kumar@email.com','Placed',4.0,ARRAY['Customer Service','City Delivery','Liftgate'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Ravi Toure','DZ Driver','DZ','Mississauga, ON','+1-416-555-1096','ravi.toure@email.com','Placed',3.9,ARRAY['Hand Truck','City Delivery','Route Planning'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Carlos Singh','DZ Driver','DZ','Scarborough, ON','+1-416-555-1097','carlos.singh@email.com','Screened',3.9,ARRAY['Route Planning','Customer Service','Hand Truck'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Hyun Hassan','General Labour',NULL,'Oshawa, ON','+1-905-555-1098','hyun.hassan@email.com','Applied',4.8,ARRAY['Flagging','Material Handling','Site Cleanup'],false,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Amarjit Diallo','AZ Driver','AZ','Scarborough, ON','+1-416-555-1099','amarjit.diallo@email.com','Applied',3.9,ARRAY['City Driving','Log Books','TDG'],false,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Mohammed Tiwari','DZ Driver','DZ','Mississauga, ON','+1-647-555-1100','mohammed.tiwari@email.com','Background Check',3.9,ARRAY['Route Planning','City Delivery','Customer Service'],true,false,true,false,false),
('00000000-0000-0000-0000-000000000001','Rupinder Williams','AZ Driver','AZ','Mississauga, ON','+1-905-555-1101','rupinder.williams@email.com','Screened',4.7,ARRAY['Shunting','City Driving','TDG'],false,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Arjun Verma','Industrial Worker',NULL,'Toronto, ON','+1-416-555-1102','arjun.verma@email.com','Placed',4.0,ARRAY['Blueprint Reading','Machine Operation','Quality Control'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Carlos Nwosu','General Labour',NULL,'Brampton, ON','+1-905-555-1103','carlos.nwosu@email.com','Screened',4.2,ARRAY['Flagging','Lifting 50lbs','Material Handling'],true,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Mohit Asante','General Labour',NULL,'Toronto, ON','+1-647-555-1104','mohit.asante@email.com','Interview',4.0,ARRAY['Material Handling','Flagging','Steel-toed Boots'],false,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Xiao Mishra','AZ Driver','AZ','Toronto, ON','+1-647-555-1105','xiao.mishra@email.com','Placed',4.3,ARRAY['Shunting','Highway Transport','Log Books'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Mihai Nair','DZ Driver','DZ','Oshawa, ON','+1-416-555-1106','mihai.nair@email.com','Offered',3.9,ARRAY['City Delivery','Customer Service','Hand Truck'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Paramjit Eze','AZ Driver','AZ','Toronto, ON','+1-647-555-1107','paramjit.eze@email.com','Placed',4.6,ARRAY['Shunting','TDG','City Driving'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Fang Reddy','AZ Driver','AZ','Oshawa, ON','+1-647-555-1108','fang.reddy@email.com','Placed',4.3,ARRAY['City Driving','Highway Transport','TDG'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Suresh Khan','DZ Driver','DZ','Mississauga, ON','+1-647-555-1109','suresh.khan@email.com','Applied',4.7,ARRAY['City Delivery','Customer Service','Hand Truck'],false,false,true,true,false),
('00000000-0000-0000-0000-000000000001','Simran Lopez','General Labour',NULL,'Mississauga, ON','+1-416-555-1110','simran.lopez@email.com','Applied',3.9,ARRAY['Site Cleanup','Lifting 50lbs','Steel-toed Boots'],true,true,false,false,false),
('00000000-0000-0000-0000-000000000001','Arjun Ali','General Labour',NULL,'Mississauga, ON','+1-647-555-1111','arjun.ali@email.com','Screened',4.9,ARRAY['Flagging','Site Cleanup','Lifting 50lbs'],false,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Pavel Kumar','Warehouse Associate',NULL,'Mississauga, ON','+1-905-555-1112','pavel.kumar@email.com','Placed',4.6,ARRAY['Inventory Count','Shipping','RF Scanner'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Diljit Miller','AZ Driver','AZ','Mississauga, ON','+1-905-555-1113','diljit.miller@email.com','Screened',4.9,ARRAY['Log Books','Shunting','City Driving'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Mohit Mensah','DZ Driver','DZ','Etobicoke, ON','+1-416-555-1114','mohit.mensah@email.com','Applied',4.9,ARRAY['Customer Service','Route Planning','City Delivery'],false,false,false,true,true),
('00000000-0000-0000-0000-000000000001','Deepak Gupta','Warehouse Associate',NULL,'Mississauga, ON','+1-905-555-1115','deepak.gupta@email.com','Placed',4.9,ARRAY['RF Scanner','Inventory Count','Receiving'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Stefan Mendez','Warehouse Associate',NULL,'Scarborough, ON','+1-905-555-1116','stefan.mendez@email.com','Screened',4.3,ARRAY['Receiving','Pick Pack','RF Scanner'],false,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Marcus Popescu','General Labour',NULL,'Toronto, ON','+1-905-555-1117','marcus.popescu@email.com','Screened',4.5,ARRAY['Site Cleanup','Steel-toed Boots','Lifting 50lbs'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Sung Hassan','General Labour',NULL,'Toronto, ON','+1-416-555-1118','sung.hassan@email.com','Interview',3.9,ARRAY['Lifting 50lbs','Material Handling','Site Cleanup'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Jaspreet Nwosu','DZ Driver','DZ','Oshawa, ON','+1-905-555-1119','jaspreet.nwosu@email.com','Placed',4.2,ARRAY['City Delivery','Customer Service','Hand Truck'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Anil Popescu','AZ Driver','AZ','Mississauga, ON','+1-905-555-1120','anil.popescu@email.com','Applied',3.9,ARRAY['Log Books','Highway Transport','Shunting'],true,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Deepak Brown','AZ Driver','AZ','Oshawa, ON','+1-647-555-1121','deepak.brown@email.com','Screened',4.2,ARRAY['TDG','City Driving','Highway Transport'],true,true,false,false,false),
('00000000-0000-0000-0000-000000000001','Robert Liu','Forklift Operator','Forklift Cert.','Etobicoke, ON','+1-647-555-1122','robert.liu@email.com','Background Check',4.3,ARRAY['Inventory','Order Picking','Counterbalance'],true,false,true,true,true),
('00000000-0000-0000-0000-000000000001','Jian Constantin','DZ Driver','DZ','Scarborough, ON','+1-647-555-1123','jian.constantin@email.com','Shortlisted',4.3,ARRAY['Hand Truck','Liftgate','City Delivery'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Carlos Hassan','Forklift Operator','Forklift Cert.','Oshawa, ON','+1-905-555-1124','carlos.hassan@email.com','Background Check',4.8,ARRAY['Order Picking','Reach Truck','Counterbalance'],false,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Sung Asante','General Labour',NULL,'Brampton, ON','+1-416-555-1125','sung.asante@email.com','Offered',4.3,ARRAY['Site Cleanup','Flagging','Lifting 50lbs'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Kwame Williams','AZ Driver','AZ','Brampton, ON','+1-416-555-1126','kwame.williams@email.com','Placed',4.9,ARRAY['Shunting','Log Books','TDG'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Diljit Gill','Warehouse Associate',NULL,'Brampton, ON','+1-647-555-1127','diljit.gill@email.com','Shortlisted',5.0,ARRAY['Shipping','RF Scanner','Pick Pack'],false,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Amadou Wilson','Warehouse Associate',NULL,'Mississauga, ON','+1-905-555-1128','amadou.wilson@email.com','Placed',3.9,ARRAY['Shipping','Receiving','RF Scanner'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Pedro Li','Warehouse Associate',NULL,'Toronto, ON','+1-416-555-1129','pedro.li@email.com','Applied',4.3,ARRAY['Inventory Count','Pick Pack','RF Scanner'],false,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Mandeep Gill','DZ Driver','DZ','Oshawa, ON','+1-647-555-1130','mandeep.gill@email.com','Applied',4.2,ARRAY['Liftgate','Hand Truck','Customer Service'],false,false,false,true,false),
('00000000-0000-0000-0000-000000000001','Bogdan Park','Industrial Worker',NULL,'Brampton, ON','+1-905-555-1131','bogdan.park@email.com','Applied',4.0,ARRAY['Blueprint Reading','WHMIS','Quality Control'],false,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Kofi Brar','DZ Driver','DZ','Mississauga, ON','+1-647-555-1132','kofi.brar@email.com','Placed',4.2,ARRAY['Hand Truck','Customer Service','City Delivery'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Xiao Rao','Industrial Worker',NULL,'Toronto, ON','+1-647-555-1133','xiao.rao@email.com','Applied',4.7,ARRAY['Assembly Line','Blueprint Reading','Quality Control'],true,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Taiwo Liu','Industrial Worker',NULL,'Oshawa, ON','+1-905-555-1134','taiwo.liu@email.com','Interview',4.8,ARRAY['Machine Operation','Blueprint Reading','WHMIS'],false,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Brian Eze','General Labour',NULL,'Mississauga, ON','+1-905-555-1135','brian.eze@email.com','Background Check',4.7,ARRAY['Steel-toed Boots','Lifting 50lbs','Site Cleanup'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Arjun Williams','AZ Driver','AZ','Brampton, ON','+1-416-555-1136','arjun.williams@email.com','Applied',4.1,ARRAY['TDG','Log Books','City Driving'],false,true,true,false,true),
('00000000-0000-0000-0000-000000000001','James Liu','General Labour',NULL,'Etobicoke, ON','+1-905-555-1137','james.liu@email.com','Shortlisted',4.9,ARRAY['Steel-toed Boots','Flagging','Material Handling'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Raj Miller','General Labour',NULL,'Toronto, ON','+1-905-555-1138','raj.miller@email.com','Placed',4.8,ARRAY['Flagging','Steel-toed Boots','Lifting 50lbs'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Sung Johnson','General Labour',NULL,'Brampton, ON','+1-647-555-1139','sung.johnson@email.com','Offered',4.1,ARRAY['Lifting 50lbs','Site Cleanup','Flagging'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Navdeep Diallo','DZ Driver','DZ','Scarborough, ON','+1-647-555-1140','navdeep.diallo@email.com','Interview',4.4,ARRAY['Customer Service','Route Planning','City Delivery'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Vikram Sharma','General Labour',NULL,'Toronto, ON','+1-416-555-1141','vikram.sharma@email.com','Applied',5.0,ARRAY['Steel-toed Boots','Lifting 50lbs','Material Handling'],false,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Suresh Mishra','General Labour',NULL,'Scarborough, ON','+1-647-555-1142','suresh.mishra@email.com','Shortlisted',3.9,ARRAY['Material Handling','Steel-toed Boots','Site Cleanup'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Taiwo Lopez','General Labour',NULL,'Scarborough, ON','+1-905-555-1143','taiwo.lopez@email.com','Placed',4.5,ARRAY['Lifting 50lbs','Site Cleanup','Steel-toed Boots'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Rupinder Reddy','Forklift Operator','Forklift Cert.','Mississauga, ON','+1-905-555-1144','rupinder.reddy@email.com','Applied',4.3,ARRAY['Inventory','Counterbalance','RF Scanner'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Deepak Tiwari','Forklift Operator','Forklift Cert.','Brampton, ON','+1-416-555-1145','deepak.tiwari@email.com','Placed',5.0,ARRAY['Reach Truck','Inventory','Order Picking'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Hyun Verma','Warehouse Associate',NULL,'Oshawa, ON','+1-905-555-1146','hyun.verma@email.com','Placed',4.1,ARRAY['Receiving','RF Scanner','Pick Pack'],true,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Brian Gupta','Forklift Operator','Forklift Cert.','Etobicoke, ON','+1-647-555-1147','brian.gupta@email.com','Background Check',4.1,ARRAY['RF Scanner','Order Picking','Inventory'],true,false,true,false,false),
('00000000-0000-0000-0000-000000000001','Rupinder Miller','AZ Driver','AZ','Scarborough, ON','+1-647-555-1148','rupinder.miller@email.com','Placed',4.1,ARRAY['Highway Transport','TDG','Shunting'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Navneet Dhaliwal','General Labour',NULL,'Oshawa, ON','+1-647-555-1149','navneet.dhaliwal@email.com','Offered',4.9,ARRAY['Site Cleanup','Lifting 50lbs','Material Handling'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Deepak Dhaliwal','Forklift Operator','Forklift Cert.','Mississauga, ON','+1-647-555-1150','deepak.dhaliwal@email.com','Applied',4.9,ARRAY['Inventory','Reach Truck','RF Scanner'],false,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Carlos Nair','AZ Driver','AZ','Oshawa, ON','+1-416-555-1151','carlos.nair@email.com','Offered',4.9,ARRAY['Shunting','Highway Transport','Log Books'],true,false,false,true,true),
('00000000-0000-0000-0000-000000000001','Amadou Johnson','AZ Driver','AZ','Scarborough, ON','+1-416-555-1152','amadou.johnson@email.com','Offered',4.3,ARRAY['City Driving','Highway Transport','Shunting'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Segun Khan','Warehouse Associate',NULL,'Brampton, ON','+1-416-555-1153','segun.khan@email.com','Background Check',4.7,ARRAY['Shipping','RF Scanner','Receiving'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','John Patel','General Labour',NULL,'Oshawa, ON','+1-416-555-1154','john.patel@email.com','Background Check',4.6,ARRAY['Flagging','Steel-toed Boots','Material Handling'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Adebayo Asante','DZ Driver','DZ','Etobicoke, ON','+1-647-555-1155','adebayo.asante@email.com','Placed',4.7,ARRAY['Customer Service','Hand Truck','Route Planning'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Mohammed Kumar','General Labour',NULL,'Oshawa, ON','+1-416-555-1156','mohammed.kumar@email.com','Interview',4.2,ARRAY['Steel-toed Boots','Material Handling','Lifting 50lbs'],true,true,false,true,true),
('00000000-0000-0000-0000-000000000001','Pedro Toure','Forklift Operator','Forklift Cert.','Toronto, ON','+1-647-555-1157','pedro.toure@email.com','Shortlisted',4.7,ARRAY['Inventory','Reach Truck','Counterbalance'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Amarjit Adeyemi','Warehouse Associate',NULL,'Toronto, ON','+1-416-555-1158','amarjit.adeyemi@email.com','Interview',4.8,ARRAY['Shipping','Inventory Count','Pick Pack'],true,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Amit Wang','Warehouse Associate',NULL,'Brampton, ON','+1-647-555-1159','amit.wang@email.com','Shortlisted',3.9,ARRAY['Shipping','RF Scanner','Inventory Count'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Gurpreet Tiwari','DZ Driver','DZ','Toronto, ON','+1-647-555-1160','gurpreet.tiwari@email.com','Applied',3.9,ARRAY['City Delivery','Liftgate','Route Planning'],false,false,true,false,true),
('00000000-0000-0000-0000-000000000001','Mihai Patel','Warehouse Associate',NULL,'Mississauga, ON','+1-416-555-1161','mihai.patel@email.com','Placed',4.8,ARRAY['RF Scanner','Receiving','Shipping'],false,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Navneet Ionescu','Warehouse Associate',NULL,'Scarborough, ON','+1-905-555-1162','navneet.ionescu@email.com','Applied',4.7,ARRAY['Shipping','RF Scanner','Receiving'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Stefan Lee','General Labour',NULL,'Mississauga, ON','+1-416-555-1163','stefan.lee@email.com','Screened',4.0,ARRAY['Flagging','Steel-toed Boots','Material Handling'],false,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Marcus Williams','DZ Driver','DZ','Brampton, ON','+1-647-555-1164','marcus.williams@email.com','Applied',4.6,ARRAY['Hand Truck','City Delivery','Route Planning'],false,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Carlos Gill','General Labour',NULL,'Scarborough, ON','+1-647-555-1165','carlos.gill@email.com','Screened',4.7,ARRAY['Lifting 50lbs','Steel-toed Boots','Flagging'],false,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Christopher Toure','DZ Driver','DZ','Scarborough, ON','+1-647-555-1166','christopher.toure@email.com','Applied',4.3,ARRAY['Hand Truck','Route Planning','Customer Service'],true,false,false,false,false),
('00000000-0000-0000-0000-000000000001','Wei Gupta','General Labour',NULL,'Etobicoke, ON','+1-647-555-1167','wei.gupta@email.com','Applied',4.4,ARRAY['Steel-toed Boots','Flagging','Material Handling'],false,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Carlos Rodriguez','General Labour',NULL,'Etobicoke, ON','+1-905-555-1168','carlos.rodriguez@email.com','Interview',4.1,ARRAY['Lifting 50lbs','Site Cleanup','Flagging'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','John Adeyemi','DZ Driver','DZ','Etobicoke, ON','+1-905-555-1169','john.adeyemi@email.com','Placed',4.8,ARRAY['Hand Truck','City Delivery','Liftgate'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Ibrahim Singh','DZ Driver','DZ','Mississauga, ON','+1-647-555-1170','ibrahim.singh@email.com','Placed',4.5,ARRAY['City Delivery','Liftgate','Hand Truck'],true,false,true,true,true),
('00000000-0000-0000-0000-000000000001','Hyun Wilson','DZ Driver','DZ','Scarborough, ON','+1-647-555-1171','hyun.wilson@email.com','Interview',4.4,ARRAY['Liftgate','Hand Truck','City Delivery'],false,false,true,true,false),
('00000000-0000-0000-0000-000000000001','Christopher Tiwari','AZ Driver','AZ','Brampton, ON','+1-905-555-1172','christopher.tiwari@email.com','Screened',4.0,ARRAY['City Driving','Log Books','Shunting'],true,false,true,false,false),
('00000000-0000-0000-0000-000000000001','Xiao Brown','Warehouse Associate',NULL,'Etobicoke, ON','+1-647-555-1173','xiao.brown@email.com','Placed',4.8,ARRAY['RF Scanner','Inventory Count','Pick Pack'],true,true,true,true,false),
('00000000-0000-0000-0000-000000000001','Carlos Kim','AZ Driver','AZ','Brampton, ON','+1-905-555-1174','carlos.kim@email.com','Placed',4.8,ARRAY['Highway Transport','City Driving','Shunting'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Anil Constantin','General Labour',NULL,'Brampton, ON','+1-905-555-1175','anil.constantin@email.com','Applied',4.4,ARRAY['Lifting 50lbs','Flagging','Material Handling'],true,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Bogdan Iyer','Industrial Worker',NULL,'Mississauga, ON','+1-905-555-1176','bogdan.iyer@email.com','Applied',4.5,ARRAY['Assembly Line','WHMIS','Blueprint Reading'],true,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Andrei Li','General Labour',NULL,'Mississauga, ON','+1-905-555-1177','andrei.li@email.com','Placed',4.6,ARRAY['Site Cleanup','Steel-toed Boots','Flagging'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Deepak Adeyemi','Forklift Operator','Forklift Cert.','Brampton, ON','+1-416-555-1178','deepak.adeyemi@email.com','Placed',4.6,ARRAY['Reach Truck','Counterbalance','Inventory'],true,false,false,false,false),
('00000000-0000-0000-0000-000000000001','Anthony Ahmed','Industrial Worker',NULL,'Oshawa, ON','+1-905-555-1179','anthony.ahmed@email.com','Offered',4.6,ARRAY['Quality Control','Machine Operation','Assembly Line'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Wei Kaur','DZ Driver','DZ','Toronto, ON','+1-905-555-1180','wei.kaur@email.com','Applied',4.5,ARRAY['Liftgate','City Delivery','Route Planning'],false,false,false,false,true),
('00000000-0000-0000-0000-000000000001','Navneet Pillai','Forklift Operator','Forklift Cert.','Oshawa, ON','+1-905-555-1181','navneet.pillai@email.com','Applied',4.3,ARRAY['Inventory','Order Picking','Counterbalance'],false,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Segun Pillai','General Labour',NULL,'Etobicoke, ON','+1-905-555-1182','segun.pillai@email.com','Screened',4.6,ARRAY['Steel-toed Boots','Flagging','Site Cleanup'],false,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Mandeep Brar','DZ Driver','DZ','Mississauga, ON','+1-416-555-1183','mandeep.brar@email.com','Background Check',3.9,ARRAY['Route Planning','Liftgate','Hand Truck'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Robert Zhang','General Labour',NULL,'Toronto, ON','+1-905-555-1184','robert.zhang@email.com','Interview',3.9,ARRAY['Lifting 50lbs','Flagging','Material Handling'],false,true,false,false,false),
('00000000-0000-0000-0000-000000000001','Parminder Miller','General Labour',NULL,'Etobicoke, ON','+1-647-555-1185','parminder.miller@email.com','Placed',4.0,ARRAY['Material Handling','Site Cleanup','Steel-toed Boots'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Jaspreet Kumar','General Labour',NULL,'Scarborough, ON','+1-416-555-1186','jaspreet.kumar@email.com','Background Check',4.1,ARRAY['Steel-toed Boots','Flagging','Material Handling'],true,true,false,false,true),
('00000000-0000-0000-0000-000000000001','Kulwinder Gill','DZ Driver','DZ','Brampton, ON','+1-416-555-1187','kulwinder.gill@email.com','Background Check',4.2,ARRAY['Customer Service','Liftgate','Route Planning'],false,false,false,true,true),
('00000000-0000-0000-0000-000000000001','Kevin Chen','DZ Driver','DZ','Mississauga, ON','+1-647-555-1188','kevin.chen@email.com','Background Check',4.6,ARRAY['Customer Service','Hand Truck','Liftgate'],false,false,true,true,false),
('00000000-0000-0000-0000-000000000001','Sung Mendez','Industrial Worker',NULL,'Toronto, ON','+1-647-555-1189','sung.mendez@email.com','Screened',3.8,ARRAY['Blueprint Reading','WHMIS','Machine Operation'],false,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Jaspreet Reddy','Warehouse Associate',NULL,'Etobicoke, ON','+1-416-555-1190','jaspreet.reddy@email.com','Placed',4.1,ARRAY['RF Scanner','Shipping','Receiving'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Anil Garcia','General Labour',NULL,'Toronto, ON','+1-647-555-1191','anil.garcia@email.com','Interview',4.9,ARRAY['Flagging','Material Handling','Site Cleanup'],false,true,false,true,false),
('00000000-0000-0000-0000-000000000001','Hyun Kumar','Forklift Operator','Forklift Cert.','Toronto, ON','+1-416-555-1192','hyun.kumar@email.com','Applied',3.9,ARRAY['Inventory','RF Scanner','Reach Truck'],true,true,false,false,false),
('00000000-0000-0000-0000-000000000001','Christopher Wang','DZ Driver','DZ','Etobicoke, ON','+1-905-555-1193','christopher.wang@email.com','Shortlisted',4.4,ARRAY['Hand Truck','Route Planning','Liftgate'],true,false,true,true,true),
('00000000-0000-0000-0000-000000000001','Ming Wilson','DZ Driver','DZ','Etobicoke, ON','+1-416-555-1194','ming.wilson@email.com','Placed',3.9,ARRAY['Route Planning','Liftgate','Hand Truck'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Marcus Eze','Forklift Operator','Forklift Cert.','Brampton, ON','+1-905-555-1195','marcus.eze@email.com','Placed',4.5,ARRAY['Reach Truck','Inventory','Order Picking'],true,true,true,true,true),
('00000000-0000-0000-0000-000000000001','Robert Popescu','Forklift Operator','Forklift Cert.','Etobicoke, ON','+1-647-555-1196','robert.popescu@email.com','Background Check',4.3,ARRAY['Counterbalance','Reach Truck','RF Scanner'],true,true,true,false,false),
('00000000-0000-0000-0000-000000000001','Kulwinder Iyer','Warehouse Associate',NULL,'Toronto, ON','+1-416-555-1197','kulwinder.iyer@email.com','Applied',3.9,ARRAY['Receiving','Inventory Count','Pick Pack'],false,true,true,false,true),
('00000000-0000-0000-0000-000000000001','Miguel Hernandez','General Labour',NULL,'Toronto, ON','+1-647-555-1198','miguel.hernandez@email.com','Applied',4.0,ARRAY['Steel-toed Boots','Lifting 50lbs','Site Cleanup'],false,true,false,false,false),
('00000000-0000-0000-0000-000000000001','Navneet Okonkwo','AZ Driver','AZ','Mississauga, ON','+1-647-555-1199','navneet.okonkwo@email.com','Screened',4.0,ARRAY['Highway Transport','Shunting','Log Books'],true,false,false,true,true);

-- 20 Jobs (uses subquery to get real client IDs)
INSERT INTO staffflow.jobs (agency_id,client_id,title,job_type,city,openings,filled,rate_min,rate_max,status,requirements,description,deadline,posted_at)
SELECT '00000000-0000-0000-0000-000000000001', id, 'AZ Highway Driver','Transport','Brampton, ON',4,1,27,30,'Urgent',ARRAY['Class AZ','CVOS Clean','2+ yrs exp','TDG Asset'],'City and highway runs across GTA. Immediate start.',CURRENT_DATE+5,NOW()-INTERVAL '1 day' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='TruckPro Logistics'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'DZ City Delivery Driver','Transport','Etobicoke, ON',3,1,24,27,'Active',ARRAY['Class DZ','CVOS Clean','Customer Service'],'Last-mile delivery across GTA.',CURRENT_DATE+7,NOW()-INTERVAL '3 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='FastFreight GTA'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'General Labour x5','General Labour','Scarborough, ON',5,2,18,21,'Urgent',ARRAY['Steel-toed boots','Physical fitness','Background check'],'Site prep, material handling, cleanup.',CURRENT_DATE+3,NOW()-INTERVAL '2 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='BuildCore Inc.'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Forklift Operator','Industrial','Mississauga, ON',2,0,22,25,'Active',ARRAY['Forklift Cert.','CVOS','Warehouse exp.'],'Counterbalance and reach truck. Afternoon shift.',CURRENT_DATE+8,NOW()-INTERVAL '4 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='Maple Warehousing'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Assembly Line Operator','Industrial','Oshawa, ON',4,4,20,22,'Filled',ARRAY['WHMIS','Mfg. exp.','Steel-toed boots'],'Automotive parts assembly. Rotating shifts.',CURRENT_DATE+2,NOW()-INTERVAL '10 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='SteelTech Mfg.'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Warehouse Associate x3','General Labour','Brampton, ON',3,1,19,22,'Active',ARRAY['RF Scanner','Pick & Pack','Background check'],'Pick, pack, ship. Day and afternoon shifts.',CURRENT_DATE+9,NOW()-INTERVAL '5 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='AeroLogix Inc.'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'AZ Long Haul Driver','Transport','Brampton, ON',2,0,29,34,'Urgent',ARRAY['Class AZ','CVOS Clean','Logbooks','3+ yrs exp'],'Long haul Ontario-Quebec corridor. Home weekends.',CURRENT_DATE+4,NOW()-INTERVAL '2 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='TruckPro Logistics'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Reach Truck Operator','Industrial','Mississauga, ON',2,1,23,26,'Active',ARRAY['Reach Truck Cert.','WHMIS','RF Scanner'],'High-bay racking facility.',CURRENT_DATE+11,NOW()-INTERVAL '6 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='Ontario Cold Storage'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'DZ Flatbed Driver','Transport','Scarborough, ON',2,0,25,28,'Active',ARRAY['Class DZ','Flatbed exp.','CVOS Clean'],'Flatbed hauling, construction materials, GTA.',CURRENT_DATE+12,NOW()-INTERVAL '7 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='Ridgeline Construction'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Machine Operator','Industrial','Brampton, ON',3,1,21,24,'Active',ARRAY['WHMIS','Machine ops','Quality Control'],'CNC and press machine operation.',CURRENT_DATE+13,NOW()-INTERVAL '8 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='Nexus Auto Parts'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'AZ Local Driver','Transport','Toronto, ON',3,2,26,29,'Active',ARRAY['Class AZ','CVOS Clean','City driving'],'Local GTA runs, daily home time.',CURRENT_DATE+14,NOW()-INTERVAL '9 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='Metro Transit Works'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'General Labour Nights','General Labour','Mississauga, ON',4,0,19,21,'Urgent',ARRAY['Steel-toed boots','Night shift','Background check'],'Night shift material handling.',CURRENT_DATE+6,NOW()-INTERVAL '1 day' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='GreenLeaf Distribution'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Cold Storage Picker','General Labour','Mississauga, ON',3,2,20,23,'Active',ARRAY['Cold storage exp.','RF Scanner','Steel-toed boots'],'Order picking in refrigerated warehouse.',CURRENT_DATE+15,NOW()-INTERVAL '11 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='Ontario Cold Storage'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'G Licensed Courier','Transport','Toronto, ON',2,1,19,22,'Active',ARRAY['Class G','Clean abstract','Customer Service'],'Local courier, cargo van, GTA Metro.',CURRENT_DATE+16,NOW()-INTERVAL '12 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='Metro Transit Works'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'DZ Tanker Driver','Transport','Brampton, ON',1,0,28,32,'Urgent',ARRAY['Class DZ','TDG','CVOS Clean','Tanker endorsement'],'Liquid tanker transport, industrial chemicals.',CURRENT_DATE+5,NOW()-INTERVAL '1 day' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='TruckPro Logistics'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Shipping Receiving Clerk','General Labour','Etobicoke, ON',1,0,20,23,'Active',ARRAY['RF Scanner','Inventory','Background check'],'Manage inbound/outbound shipments.',CURRENT_DATE+17,NOW()-INTERVAL '13 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='FastFreight GTA'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Pallet Jack Operator','General Labour','Brampton, ON',2,0,18,20,'Active',ARRAY['Electric pallet jack','RF Scanner','Background check'],'Unload containers, stage for production.',CURRENT_DATE+18,NOW()-INTERVAL '14 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='Pinnacle Packaging'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Quality Control Inspector','Industrial','Oshawa, ON',1,0,22,25,'Active',ARRAY['WHMIS','Blueprint Reading','Mfg. exp.'],'Inspect automotive parts against spec.',CURRENT_DATE+19,NOW()-INTERVAL '15 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='SteelTech Mfg.'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Inventory Control Analyst','General Labour','Mississauga, ON',1,1,21,24,'Filled',ARRAY['Inventory systems','Excel','Background check'],'Cycle counts, discrepancy resolution.',CURRENT_DATE+20,NOW()-INTERVAL '16 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='Maple Warehousing'
UNION ALL SELECT '00000000-0000-0000-0000-000000000001', id, 'Industrial Cleaner','General Labour','Scarborough, ON',3,3,17,19,'Filled',ARRAY['WHMIS','Background check','Evening availability'],'Commercial cleaning for industrial facilities.',CURRENT_DATE+21,NOW()-INTERVAL '17 days' FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' AND company_name='BuildCore Inc.';

-- Placements for Placed candidates
INSERT INTO staffflow.placements (agency_id, candidate_id, client_id, job_id, status, start_date, end_date, hourly_rate)
SELECT 
  '00000000-0000-0000-0000-000000000001',
  c.id,
  cl.id,
  j.id,
  'Active',
  CURRENT_DATE - (10 + ROW_NUMBER() OVER () * 3)::int,
  CURRENT_DATE + (30 + ROW_NUMBER() OVER () * 5)::int,
  22 + (ROW_NUMBER() OVER () % 10)
FROM staffflow.candidates c
CROSS JOIN LATERAL (SELECT id FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001' ORDER BY id LIMIT 1 OFFSET (ROW_NUMBER() OVER () % 12)::int) cl
CROSS JOIN LATERAL (SELECT id FROM staffflow.jobs WHERE agency_id='00000000-0000-0000-0000-000000000001' ORDER BY id LIMIT 1 OFFSET (ROW_NUMBER() OVER () % 20)::int) j
WHERE c.agency_id='00000000-0000-0000-0000-000000000001' AND c.status='Placed';

-- Timesheets for placements
INSERT INTO staffflow.timesheets (agency_id, candidate_id, placement_id, client_id, week_start, week_end, regular_hours, overtime_hours, hourly_rate, status, submitted_at)
SELECT
  p.agency_id, p.candidate_id, p.id, p.client_id,
  DATE_TRUNC('week', NOW() - INTERVAL '7 days')::date,
  DATE_TRUNC('week', NOW() - INTERVAL '7 days')::date + 4,
  40 + (ROW_NUMBER() OVER () % 5),
  CASE WHEN ROW_NUMBER() OVER () % 4 = 0 THEN 4 ELSE 0 END,
  p.hourly_rate,
  CASE ROW_NUMBER() OVER () % 3 WHEN 0 THEN 'Approved' WHEN 1 THEN 'Pending' ELSE 'Approved' END,
  NOW() - INTERVAL '2 days'
FROM staffflow.placements p
WHERE p.agency_id='00000000-0000-0000-0000-000000000001';

INSERT INTO staffflow.timesheets (agency_id, candidate_id, placement_id, client_id, week_start, week_end, regular_hours, overtime_hours, hourly_rate, status, submitted_at)
SELECT
  p.agency_id, p.candidate_id, p.id, p.client_id,
  DATE_TRUNC('week', NOW() - INTERVAL '14 days')::date,
  DATE_TRUNC('week', NOW() - INTERVAL '14 days')::date + 4,
  38 + (ROW_NUMBER() OVER () % 7),
  CASE WHEN ROW_NUMBER() OVER () % 5 = 0 THEN 6 ELSE 0 END,
  p.hourly_rate,
  'Approved',
  NOW() - INTERVAL '9 days'
FROM staffflow.placements p
WHERE p.agency_id='00000000-0000-0000-0000-000000000001';

SELECT 
  (SELECT COUNT(*) FROM staffflow.clients WHERE agency_id='00000000-0000-0000-0000-000000000001') AS clients,
  (SELECT COUNT(*) FROM staffflow.candidates WHERE agency_id='00000000-0000-0000-0000-000000000001') AS candidates,
  (SELECT COUNT(*) FROM staffflow.jobs WHERE agency_id='00000000-0000-0000-0000-000000000001') AS jobs,
  (SELECT COUNT(*) FROM staffflow.placements WHERE agency_id='00000000-0000-0000-0000-000000000001') AS placements,
  (SELECT COUNT(*) FROM staffflow.timesheets WHERE agency_id='00000000-0000-0000-0000-000000000001') AS timesheets;
