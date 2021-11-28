package com.app.appweb.controllers;

import com.app.appweb.controllers.model.Admin;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import com.app.appweb.controllers.model.Category;
import com.app.appweb.controllers.model.Client;
import com.app.appweb.controllers.model.Messages;
import com.app.appweb.controllers.model.Partyroom;
import com.app.appweb.controllers.model.Reservations;
import com.app.appweb.controllers.model.Score;
import com.app.appweb.repository.AdminRepository;
import com.app.appweb.repository.CategoryRepository;
import com.app.appweb.repository.ClientRepository;
import com.app.appweb.repository.MessageRepository;
import com.app.appweb.repository.PartyroomRepository;
import com.app.appweb.repository.ReservationRepository;
import com.app.appweb.repository.ScoreRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Repository;



@Repository
@Transactional
public class ManejadorEntidad {
    @PersistenceContext
    private EntityManager manejador;
    @Autowired
    private CategoryRepository caCrud;
    @Autowired
    private PartyroomRepository pacrud;
    @Autowired
    private ClientRepository clcrud;
    @Autowired
    private MessageRepository mecrud;
    @Autowired
    private ReservationRepository recrud;
    @Autowired
    private AdminRepository adcrud;
    private ScoreRepository sccrud;
    
    public void CategoriasPost(Category category){
        manejador.persist(category);
    }

    public List<Category> todos() {
        return manejador.createQuery("select C from Category C" , Category.class).getResultList();
    }
    
    public Category CategoryUpdate(Category category){
        if(category.getId()!=null){
            Optional<Category>g=caCrud.getCategory(category.getId());
            if(!g.isEmpty()){
                if(category.getDescription()!=null){
                    g.get().setDescription(category.getDescription());
                }
                if(category.getName()!=null){
                    g.get().setName(category.getName());
                }
                return caCrud.save(g.get());
            }
        }
        return category;
    }
    
    public void CategoriasDelete(int id){
        Category category = manejador.find(Category.class, id);
        manejador.remove(category);
    }

    public void PartyroomPost(Partyroom partyroom){
        manejador.persist(partyroom);
    }
    
    public List<Partyroom> PartyroomGet(){
        return manejador.createQuery("select P from Partyroom P" , Partyroom.class).getResultList();
    }
    
    public Partyroom PartyroomUpdate(Partyroom partyroom){
        if(partyroom.getId()!=null){
            Optional<Partyroom> e=pacrud.getPartyroom(partyroom.getId());
            if(!e.isEmpty()){
                if(partyroom.getName()!=null){
                    e.get().setName(partyroom.getName());
                }
                if(partyroom.getOwner()!=null){
                    e.get().setOwner(partyroom.getOwner());
                }
                if(partyroom.getCapacity()!=null){
                    e.get().setCapacity(partyroom.getCapacity());
                }
                if(partyroom.getDescription()!=null){
                    e.get().setDescription(partyroom.getDescription());
                }
                if(partyroom.getCategory()!=null){
                    e.get().setCategory(partyroom.getCategory());
                }
                pacrud.save(e.get());
                return e.get();
            }else{
                return partyroom;
            }
        }else{
            return partyroom;
        }
    }
    
    public void PartyroomDelete(int id){
       Partyroom partyroom  = manejador.find(Partyroom.class, id);
       manejador.remove(partyroom);
    }

    public void MessagesPost(Messages messages){
        manejador.persist(messages);
    }

    public List<Messages> messageGet(){
        return manejador.createQuery("select M from Messages M", Messages.class).getResultList();
    }
    
    public Messages MessagesUpdate(Messages message){
        if(message.getIdMessage()!=null){
            Optional<Messages> e= mecrud.getMessage(message.getIdMessage());
            if(!e.isEmpty()){
                if(message.getMessageText()!=null){
                    e.get().setMessageText(message.getMessageText());
                }
                mecrud.save(e.get());
                return e.get();
            }else{
                return message;
            }
        }else{
            return message;
        }
    }
    
    public void MessagesDelete(int id){
       Messages messages = manejador.find(Messages.class, id);
       manejador.remove(messages);
    }

    public void ReservationsPost(Reservations reservations){
        manejador.persist(reservations);
    }

    public List<Reservations> ReservationsGet(){
        return manejador.createQuery("select R from Reservations R" , Reservations.class).getResultList();
    }
    
    public void ReservationsDelete(int id){
       Reservations reservations  = manejador.find(Reservations.class, id);
       manejador.remove(reservations);
    }
        
    public Reservations ReservationsUpdate(Reservations reservacion){
        if(reservacion.getIdReservation()!=null){
            Optional<Reservations> e= recrud.getReservation(reservacion.getIdReservation());
            if(!e.isEmpty()){

                if(reservacion.getStartDate()!=null){
                    e.get().setStartDate(reservacion.getStartDate());
                }
                if(reservacion.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reservacion.getDevolutionDate());
                }
                if(reservacion.getStatus()!=null){
                    e.get().setStatus(reservacion.getStatus());
                }
                recrud.save(e.get());
                return e.get();
            }else{
                return reservacion;
            }
        }else{
            return reservacion;
        }
    }

    public void ClientPost(Client client) {
        manejador.persist(client);
    }

    public List<Client> ClientGet() {
        return manejador.createQuery("select C from Client C" , Client.class).getResultList();
    }
    
    public Client ClientUpdate(Client client){
        if(client.getIdClient()!=null){
            Optional<Client> e= clcrud.getClient(client.getIdClient());
            if(!e.isEmpty()){
                if(client.getName()!=null){
                    e.get().setName(client.getName());
                }
                if(client.getAge()!=null){
                    e.get().setAge(client.getAge());
                }
                if(client.getEmail()!=null){
                    e.get().setEmail(client.getEmail());
                }
                if(client.getPassword()!=null){
                    e.get().setPassword(client.getPassword());
                }
                clcrud.save(e.get());
                return e.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }
    
    public void ClientDelete(int id){
       Client client  = manejador.find(Client.class, id);
       manejador.remove(client);
    }
    
    public void AdminPost(Admin admin){
        manejador.persist(admin);
    }
    
    public List<Admin> AdminGet(){
        return manejador.createQuery("select A from Admin A" , Admin.class).getResultList();
    }
        
    public Admin AdminUpdate(Admin admin){
        if(admin.getIdAdmin()!=null){
            Optional<Admin>g=adcrud.getAdmin(admin.getIdAdmin());
            if(!g.isEmpty()){
                if(admin.getName()!=null){
                    g.get().setName(admin.getName());
                }
                if(admin.getEmail()!=null){
                    g.get().setEmail(admin.getEmail());
                }
                if(admin.getPassword()!=null){
                    g.get().setPassword(admin.getPassword());
                }
                return adcrud.save(g.get());
            }
        }
        return admin;
    }
    
    public void AdminDelete(int id){
       Admin admin  = manejador.find(Admin.class, id);
       manejador.remove(admin);
    }
    
    public void ScorePost(Score score){
        manejador.persist(score);
        
    }
    
    public List<Score> ScoreGet(){
        return manejador.createQuery("select S from Score S" , Score.class).getResultList();
    }
    
    public Score ScoreUpdate(Score score){
        if(score.getId()!=null){
            Optional<Score>g=sccrud.getScore(score.getId());
            if(!g.isEmpty()){
                if(score.getQualification()!=null){
                    g.get().setQualification(score.getQualification());
                }
                if(score.getMessage()!=null){
                    g.get().setMessage(score.getMessage());
                }
                if(score.getPartyroom()!=null){
                    g.get().setPartyroom(score.getPartyroom());
                }
                return sccrud.save(g.get());
            }
        }
        return score;
    }    
    
    
    public void ScoreDelete(int id){
       Client client  = manejador.find(Client.class, id);
       manejador.remove(client);
    }
    
    
    

}
