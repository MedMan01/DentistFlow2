package com.DentistFlow.DentistFlow.web;

import com.DentistFlow.DentistFlow.Enum.PaymentStatus;
import com.DentistFlow.DentistFlow.Enum.PaymentType;
import com.DentistFlow.DentistFlow.dtos.NewPaymentDTO;
import com.DentistFlow.DentistFlow.entities.Payment;
import com.DentistFlow.DentistFlow.entities.RendezVous;
import com.DentistFlow.DentistFlow.repository.PaymentRepository;
import com.DentistFlow.DentistFlow.repository.RendezVousRepository;
import com.DentistFlow.DentistFlow.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
public class PaymentController {

@Autowired
    private PaymentRepository paymentRepository;
@Autowired
    private PaymentService paymentService;

    @GetMapping(path = "/payments")
    public List<Payment> allPayments(){
        return paymentRepository.findAll();
    }

    @GetMapping(path = "/rendezvous/{id}/payment")
    public List<Payment> PaymentByRendezvous(@PathVariable Long id){
        return paymentRepository.findByRendezVousId(id);
    }
    @GetMapping(path = "/payments/byStatus")
    public List<Payment> PaymentsByStatus(@RequestParam PaymentStatus status){
        return paymentRepository.findByStatus(status);
    }

    @GetMapping(path = "/payments/byType")
    public List<Payment> PaymetsByType(@RequestParam PaymentType type){
        return paymentRepository.findByType(type);
    }

    @GetMapping(path = "/payments/{id}")
    public Payment getPaymentById(@PathVariable Long id){
        return paymentRepository.findById(id).get();
    }



    @PutMapping("/payments/{id}")
    public Payment updatePayment(LocalDate date, double amount, PaymentType type, Long rendezvousId,@PathVariable Long id){
        return paymentService.updatePayment(date,amount,type,rendezvousId, id);
    }
    @PutMapping("/paymentStatus/{id}")
    public Payment updatePaymentStatus(@RequestParam PaymentStatus status,@PathVariable Long id){
        return paymentService.updatePaymentStatus(status, id);
    }
    @PutMapping("/paymentType/{id}")
    public Payment updatePaymentType(@RequestParam PaymentType type,@PathVariable Long id){
        return paymentService.updatePaymentType(type, id);
    }

    @PostMapping(path= "/payments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> savePayment( NewPaymentDTO newPaymentDTO, @RequestParam("file") MultipartFile file) {
        try {
            // Log pour vérifier les données reçues
            System.out.println("Received payment request: " + newPaymentDTO.toString());

            Payment savedPayment = paymentService.savePayment(file, newPaymentDTO);
            return ResponseEntity.ok(savedPayment);
        } catch (Exception e) {
            // Log de l'exception pour le débogage
            e.printStackTrace();
            // Retourner une réponse d'erreur avec un message significatif
            return ResponseEntity.badRequest().body("Failed to save payment: " + e.getMessage());
        }
    }




    @GetMapping(value = "/paymentFile/{paymentId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws IOException {

        return  paymentService.getPaymentFile(paymentId);
    }
    @DeleteMapping("/payment/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable Long id) {
        paymentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

